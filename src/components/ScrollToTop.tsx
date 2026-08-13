import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Sends every new page to the top.
 *
 * Without this, clicking a link halfway down one page drops you into the
 * middle of the next one, because the browser keeps the scroll position
 * across a client-side route change.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // "instant" on purpose: the stylesheet sets scroll-behavior: smooth,
    // and without overriding it here every page change would animate a
    // long scroll up from wherever you were.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
