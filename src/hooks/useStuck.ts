import { RefObject, useEffect, useRef, useState } from "react";

/**
 * Tracks whether a sticky element has left its resting place.
 *
 * Returns a ref to attach to a zero-height sentinel sitting immediately
 * *before* the sticky element, plus a boolean that flips true once that
 * sentinel scrolls off the top of the viewport — which is exactly the
 * moment the sticky element pins itself.
 *
 * A scroll listener comparing `scrollY` against a fixed number would
 * have to hard-code the header's height, and that height changes with
 * the viewport (the wordmark is fluid, and the top bar wraps on narrow
 * screens). The sentinel measures the real thing instead, and an
 * IntersectionObserver costs nothing per frame.
 */
export default function useStuck(): [RefObject<HTMLDivElement>, boolean] {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      // Only the very top edge matters, so the root is squeezed to a
      // one-pixel band at the top of the viewport.
      { rootMargin: "0px 0px -100% 0px", threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return [sentinelRef, stuck];
}
