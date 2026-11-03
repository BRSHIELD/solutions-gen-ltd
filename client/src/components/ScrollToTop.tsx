import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Single-page apps keep the scroll position when the route changes.
 * This resets to the top on every navigation, or to the element named
 * in the URL hash (e.g. /contact#contact-form) when there is one.
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        // Let the new page render before jumping to the anchor.
        requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return null;
}
