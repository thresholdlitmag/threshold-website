import { useEffect, useState } from "react";

/**
 * True once the page has been scrolled further than `threshold` pixels.
 *
 * Used by the floating quick-nav and the back-to-top button so neither
 * appears until the main header has scrolled out of view.
 */
export default function useScrolledPast(threshold: number): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    function check() {
      setPast(window.scrollY > threshold);
    }
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [threshold]);

  return past;
}
