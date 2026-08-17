import { lazy, Suspense, useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const GrainFieldGL = lazy(() => import("./GrainFieldGL"));

/**
 * Decides whether the GPU grain layer is appropriate, and only then pulls the
 * WebGL code in. Everything else — mobile, reduced motion, coarse pointers,
 * no WebGL — gets the static CSS grain that's already on <body>, which is a
 * complete look on its own rather than a degraded one.
 */
export const GrainField = ({ intensity = 0.16 }) => {
  const reduced = usePrefersReducedMotion();
  const [eligible, setEligible] = useState(false);

  useEffect(() => {
    if (reduced) {
      setEligible(false);
      return;
    }

    const check = () => {
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      const wideEnough = window.innerWidth >= 900;
      // Respect data-saver / low-memory devices
      const saveData = navigator.connection?.saveData === true;
      const lowMemory = (navigator.deviceMemory ?? 8) < 4;

      setEligible(finePointer && wideEnough && !saveData && !lowMemory);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [reduced]);

  if (!eligible) return null;

  return (
    <Suspense fallback={null}>
      <GrainFieldGL intensity={intensity} />
    </Suspense>
  );
};
