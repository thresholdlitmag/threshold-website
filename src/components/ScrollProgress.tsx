import { useEffect, useRef } from "react";

/**
 * A hairline of ink along the very top of the window showing how far
 * through the page you are.
 *
 * Long reads — a full poem, the submission guidelines — otherwise give
 * no sense of their own length. This is the one piece of chrome on the
 * site that reports rather than decorates.
 *
 * The width is written straight to the element's style on each frame
 * instead of being held in React state: this updates on every scroll
 * event, and re-rendering the tree that often to move one bar would be
 * an absurd amount of work for a single number.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    function measure() {
      const bar = barRef.current;
      if (!bar) return;

      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      // A page shorter than the window has nothing to report.
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      bar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
    }

    // Coalesce bursts of scroll events down to one write per frame.
    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress__bar" ref={barRef} />
    </div>
  );
}
