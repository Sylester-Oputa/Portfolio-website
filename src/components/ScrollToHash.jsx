import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router doesn't act on the hash fragment by itself, so links like
 * `/#projects` coming back from a case study page would land at the top of
 * Home instead of the work section. This bridges that gap.
 */
export const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      // Route changes without a hash start at the top
      window.scrollTo(0, 0);
      return;
    }

    // The target section may not be mounted on the first frame after a
    // route change, so retry briefly before giving up.
    let attempts = 0;
    const tryScroll = () => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
      if (attempts++ < 10) setTimeout(tryScroll, 60);
    };
    tryScroll();
  }, [pathname, hash]);

  return null;
};
