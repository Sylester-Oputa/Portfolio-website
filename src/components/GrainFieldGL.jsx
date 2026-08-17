import { useEffect, useRef } from "react";

/**
 * Animated paper-grain field on a full-screen quad. Raw WebGL — no library,
 * no dependency, and it is dynamically imported so none of this lands in the
 * main bundle.
 *
 * The grain drifts slowly and displaces toward the cursor, which is what gives
 * the page its "alive" quality without anything visibly moving.
 *
 * Rendered only after the caller has already checked for a fine pointer,
 * reduced-motion preference and a wide enough viewport.
 */

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse;
uniform vec3  u_ink;
uniform float u_intensity;

// Cheap hash-based value noise — plenty for grain.
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 aspect = vec2(u_res.x / u_res.y, 1.0);

  // Cursor displaces the field locally
  vec2 m = u_mouse / u_res.xy;
  float d = distance(uv * aspect, m * aspect);
  float pull = smoothstep(0.45, 0.0, d) * 0.16;

  vec2 p = uv * aspect * 3.0;
  p += vec2(u_time * 0.014, u_time * 0.009);
  p += (m - uv) * pull * 4.0;

  float n = fbm(p);
  // Fine high-frequency grain on top of the slow field
  float g = hash(gl_FragCoord.xy + fract(u_time) * 100.0);

  float v = n * 0.75 + g * 0.25;
  float alpha = v * u_intensity * (0.55 + pull * 2.2);

  gl_FragColor = vec4(u_ink, alpha);
}
`;

const compile = (gl, type, src) => {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s);
    return null;
  }
  return s;
};

const hexToRgbUnit = (hex) => {
  const h = (hex || "").trim().replace("#", "");
  if (h.length !== 6) return [1, 1, 1];
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
};

const GrainFieldGL = ({ intensity = 0.16 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", { alpha: true, antialias: false }) ||
      canvas.getContext("experimental-webgl", { alpha: true });

    // No WebGL — the static CSS grain underneath is already doing the job.
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    // Full-screen triangle pair
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uInk = gl.getUniformLocation(prog, "u_ink");
    const uIntensity = gl.getUniformLocation(prog, "u_intensity");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Grain takes the theme's accent so it reads as part of the palette
    const readInk = () =>
      hexToRgbUnit(
        getComputedStyle(document.documentElement).getPropertyValue("--c-accent")
      );
    let ink = readInk();

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const target = { ...mouse };
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      target.x = (e.clientX - r.left) * dpr;
      // GL origin is bottom-left
      target.y = (r.height - (e.clientY - r.top)) * dpr;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // Repaint the ink colour when the theme flips
    const themeObserver = new MutationObserver(() => {
      ink = readInk();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    let raf = null;
    let running = true;
    const start = performance.now();

    const render = (now) => {
      if (!running) return;
      // Ease the cursor so the field feels weighted rather than twitchy
      mouse.x += (target.x - mouse.x) * 0.06;
      mouse.y += (target.y - mouse.y) * 0.06;

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform3f(uInk, ink[0], ink[1], ink[2]);
      gl.uniform1f(uIntensity, intensity);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    // Don't burn GPU on a hidden tab
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      themeObserver.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
      const lose = gl.getExtension("WEBGL_lose_context");
      if (lose) lose.loseContext();
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default GrainFieldGL;
