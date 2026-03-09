import { useEffect, useRef, useState, useCallback } from "react";

const GRID = 3;
const SQ = 7;
const GAP = 3;
const TOTAL = GRID * GRID;
const BLOCK = GRID * SQ + (GRID - 1) * GAP; // 27
const SCATTER_V = 800; // px/s velocity threshold

// Precompute resting grid offsets
const REST = [];
for (let r = 0; r < GRID; r++) {
  for (let c = 0; c < GRID; c++) {
    REST.push({ x: c * (SQ + GAP), y: r * (SQ + GAP) });
  }
}

export const CustomCursor = () => {
  const containerRef = useRef(null);
  const squareRefs = useRef([]);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const prev = useRef({ x: 0, y: 0, t: Date.now() });
  const scatterData = useRef(null); // null = resting
  const hoverRef = useRef("default");
  const clickRef = useRef(false);
  const rafRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  // Touch detection — use matchMedia for reliable detection
  useEffect(() => {
    // A device with no fine pointer (no mouse/trackpad) is touch-only
    const isTouchOnly =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    setIsTouch(isTouchOnly);
    if (!isTouchOnly) document.body.classList.add("cursor-ready");
    return () => document.body.classList.remove("cursor-ready");
  }, []);

  // Hover type detection
  const getHoverType = useCallback((el) => {
    if (!el) return "default";
    const tag = el.tagName;
    if (
      tag === "A" ||
      tag === "BUTTON" ||
      tag === "INPUT" ||
      tag === "TEXTAREA" ||
      el.closest("a") ||
      el.closest("button") ||
      el.getAttribute?.("role") === "button"
    )
      return "link";
    if (
      tag === "P" ||
      tag === "SPAN" ||
      tag === "LI" ||
      tag === "BLOCKQUOTE" ||
      tag === "LABEL"
    )
      return "text";
    return "default";
  }, []);

  // Scatter trigger
  const triggerScatter = useCallback(() => {
    if (scatterData.current) return;
    const offsets = Array.from({ length: TOTAL }, () => ({
      x: (Math.random() - 0.5) * 140,
      y: (Math.random() - 0.5) * 140,
      rot: (Math.random() - 0.5) * 90,
    }));
    scatterData.current = { offsets, startTime: performance.now() };

    // Schedule reassembly
    setTimeout(() => {
      scatterData.current = null;
    }, 400);
  }, []);

  // Main animation loop + event listeners
  useEffect(() => {
    if (isTouch) return;

    const handleMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Velocity check
      const now = Date.now();
      const dt = now - prev.current.t;
      if (dt > 0) {
        const dx = e.clientX - prev.current.x;
        const dy = e.clientY - prev.current.y;
        const v = Math.sqrt(dx * dx + dy * dy) / (dt / 1000);
        if (v > SCATTER_V) triggerScatter();
      }
      prev.current = { x: e.clientX, y: e.clientY, t: now };

      // Hover detect
      const target = document.elementFromPoint(e.clientX, e.clientY);
      hoverRef.current = getHoverType(target);
    };

    const handleDown = () => {
      clickRef.current = true;
    };
    const handleUp = () => {
      clickRef.current = false;
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    // Animation frame loop — lerp position + apply transforms
    const lerp = (a, b, t) => a + (b - a) * t;
    const LERP_SPEED = 0.15; // 50ms-ish lag feel at 60fps

    const tick = () => {
      // Lerp cursor position
      pos.current.x = lerp(pos.current.x, mouse.current.x, LERP_SPEED);
      pos.current.y = lerp(pos.current.y, mouse.current.y, LERP_SPEED);

      // Move container
      if (containerRef.current) {
        containerRef.current.style.transform = `translate(${pos.current.x - BLOCK / 2}px, ${pos.current.y - BLOCK / 2}px)`;
      }

      const hover = hoverRef.current;
      const clicking = clickRef.current;
      const now = performance.now();
      const scattered = scatterData.current;

      // Update each square
      for (let i = 0; i < TOTAL; i++) {
        const el = squareRefs.current[i];
        if (!el) continue;

        const rest = REST[i];
        const col = i % GRID;
        const row = Math.floor(i / GRID);
        let tx, ty, w, h, opacity, rot, scale;

        if (hover === "link") {
          // 3x1 row of wider rectangles (middle row only)
          w = 20;
          h = SQ;
          tx = col * 23;
          ty = BLOCK / 2 - SQ / 2;
          opacity = row === 1 ? 1 : 0;
          rot = 0;
          scale = clicking ? 1.5 : 1;
          el.style.backgroundColor = "var(--c-cursor-primary)";
        } else if (hover === "text") {
          // Single blinking bar (center square only)
          if (i === 4) {
            w = 2;
            h = 18;
            tx = BLOCK / 2 - 1;
            ty = BLOCK / 2 - 9;
            opacity = 1;
          } else {
            w = SQ;
            h = SQ;
            tx = rest.x;
            ty = rest.y;
            opacity = 0;
          }
          rot = 0;
          scale = clicking ? 1.5 : 1;
          el.style.backgroundColor = "var(--c-cursor-secondary)";
        } else if (scattered) {
          // Scatter state with spring-back feel
          const elapsed = now - scattered.startTime;
          const t = Math.min(elapsed / 180, 1); // 180ms scatter out
          const easeOut = 1 - Math.pow(1 - t, 3);
          const off = scattered.offsets[i];
          tx = rest.x + off.x * easeOut;
          ty = rest.y + off.y * easeOut;
          w = SQ;
          h = SQ;
          opacity = 1;
          rot = off.rot * easeOut;
          scale = clicking ? 1.5 : 1;
          el.style.backgroundColor = "var(--c-cursor-primary)";
        } else {
          // Resting 3x3 grid
          tx = rest.x;
          ty = rest.y;
          w = SQ;
          h = SQ;
          opacity = 1;
          rot = 0;
          scale = clicking ? 1.5 : 1;
          el.style.backgroundColor = "var(--c-cursor-primary)";
        }

        el.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${scale})`;
        el.style.width = `${w}px`;
        el.style.height = `${h}px`;
        el.style.opacity = opacity;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch, getHoverType, triggerScatter]);

  if (isTouch) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: BLOCK,
        height: BLOCK,
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform",
      }}
    >
      {Array.from({ length: TOTAL }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (squareRefs.current[i] = el)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: SQ,
            height: SQ,
            borderRadius: 2,
            backgroundColor: "var(--c-cursor-primary)",
            transition: "width 0.2s, height 0.2s, opacity 0.15s",
            willChange: "transform, width, height, opacity",
          }}
        />
      ))}
    </div>
  );
};
