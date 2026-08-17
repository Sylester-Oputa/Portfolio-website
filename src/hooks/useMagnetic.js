import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Pulls an element gently toward the cursor when it's nearby, then springs
 * back on exit. Returns a ref to spread onto the element.
 *
 * Pointer-based so it never engages on touch, and disabled entirely when the
 * user has asked for reduced motion.
 */
export const useMagnetic = ({ strength = 0.28, radius = 90 } = {}) => {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = null;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      // Only react within a band around the element's own size
      const reach = Math.max(rect.width, rect.height) / 2 + radius;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (dist < reach) {
          const falloff = 1 - dist / reach;
          el.style.transform = `translate(${dx * strength * falloff}px, ${
            dy * strength * falloff
          }px)`;
        } else if (el.style.transform) {
          el.style.transform = "";
        }
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.style.transform = "";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      el.style.transform = "";
    };
  }, [reduced, strength, radius]);

  return ref;
};
