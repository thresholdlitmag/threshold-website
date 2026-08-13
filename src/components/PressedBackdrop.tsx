import { useEffect, useRef } from "react";
import Botanical, { BotanicalKind, BOTANICAL_COLORS } from "./Botanical";

/**
 * Pressed botanicals scattered behind the whole site, like specimens
 * taped onto the page under the writing.
 *
 * Two things keep this decorative rather than distracting:
 *
 *  - Everything sits near the edges. The middle of the page is where the
 *    text is, and flowers behind a paragraph make it harder to read.
 *  - The layers drift at different rates as you scroll, so the page has
 *    some depth instead of a flat pattern stuck to the glass.
 */

interface Specimen {
  kind: BotanicalKind;
  /** Percent of viewport. */
  x: number;
  y: number;
  size: number;
  rotate: number;
  opacity: number;
  color: string;
  /** 0 = furthest back and slowest, 2 = nearest and quickest. */
  depth: 0 | 1 | 2;
  /** Seconds, so neighbouring specimens don't sway in unison. */
  delay: number;
}

const C = BOTANICAL_COLORS;

const SPECIMENS: Specimen[] = [
  // ---- left margin ----
  { kind: "fern", x: 3, y: 12, size: 128, rotate: -18, opacity: 0.15, color: C[5], depth: 0, delay: 0 },
  { kind: "sprig", x: 8, y: 42, size: 84, rotate: 24, opacity: 0.2, color: C[2], depth: 1, delay: 1.6 },
  { kind: "flower", x: 2, y: 68, size: 96, rotate: -8, opacity: 0.16, color: C[1], depth: 0, delay: 3.1 },
  { kind: "leaf", x: 11, y: 88, size: 62, rotate: 44, opacity: 0.22, color: C[5], depth: 2, delay: 0.8 },
  { kind: "bud", x: 6, y: 26, size: 54, rotate: 12, opacity: 0.19, color: C[3], depth: 2, delay: 2.4 },

  // ---- right margin ----
  { kind: "daisy", x: 93, y: 8, size: 104, rotate: 16, opacity: 0.17, color: C[0], depth: 1, delay: 0.4 },
  { kind: "fern", x: 96, y: 36, size: 138, rotate: 28, opacity: 0.13, color: C[5], depth: 0, delay: 2.9 },
  { kind: "petal", x: 88, y: 56, size: 58, rotate: -36, opacity: 0.24, color: C[1], depth: 2, delay: 1.2 },
  { kind: "sprig", x: 95, y: 74, size: 92, rotate: -22, opacity: 0.18, color: C[4], depth: 1, delay: 3.6 },
  { kind: "flower", x: 90, y: 94, size: 76, rotate: 33, opacity: 0.2, color: C[2], depth: 2, delay: 2 },

  // ---- a few drifting through the upper and lower gutters ----
  { kind: "leaf", x: 32, y: 3, size: 56, rotate: -52, opacity: 0.14, color: C[5], depth: 0, delay: 1.9 },
  { kind: "petal", x: 68, y: 2, size: 46, rotate: 40, opacity: 0.16, color: C[3], depth: 1, delay: 3.3 },
  { kind: "daisy", x: 26, y: 97, size: 70, rotate: -14, opacity: 0.15, color: C[1], depth: 1, delay: 0.6 },
  { kind: "bud", x: 60, y: 99, size: 50, rotate: 20, opacity: 0.17, color: C[4], depth: 2, delay: 2.7 },
];

/** How far each layer travels against the scroll. */
const DEPTH_FACTOR = [0.04, 0.09, 0.16];

export default function PressedBackdrop() {
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    function apply() {
      frame = 0;
      const y = window.scrollY;
      layerRefs.current.forEach((layer, depth) => {
        if (!layer) return;
        // Negative: the layer creeps upward as the page moves down, just
        // more slowly than the content itself.
        layer.style.transform = `translate3d(0, ${-y * DEPTH_FACTOR[depth]}px, 0)`;
      });
    }

    function onScroll() {
      // One update per painted frame, no matter how many scroll events fire.
      if (!frame) frame = window.requestAnimationFrame(apply);
    }

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="pressed-backdrop" aria-hidden="true">
      {[0, 1, 2].map((depth) => (
        <div
          className="pressed-backdrop__layer"
          key={depth}
          ref={(node) => {
            layerRefs.current[depth] = node;
          }}
        >
          {SPECIMENS.filter((s) => s.depth === depth).map((s, i) => (
            <span
              className="pressed-specimen"
              key={`${depth}-${i}`}
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                opacity: s.opacity,
                animationDelay: `${s.delay}s`,
                ["--specimen-rotate" as string]: `${s.rotate}deg`,
              }}
            >
              <Botanical
                kind={s.kind}
                color={s.color}
                size={s.size}
                stroke={0.8}
              />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
