import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Botanical, { BotanicalKind, BOTANICAL_COLORS } from "./Botanical";

/**
 * Pressed botanicals laid down the whole length of the page, like
 * specimens taped into a scrapbook.
 *
 * They are positioned in the document, not pinned to the viewport, so
 * they scroll away with the writing and new ones come up from below —
 * the way anything else printed on the page behaves. An earlier version
 * fixed them to the screen and cross-faded between arrangements, which
 * made flowers appear and vanish in place while never actually going
 * anywhere.
 *
 * Everything sits in the left and right margins. The middle of the page
 * is where the text is, and a flower behind a paragraph just makes it
 * harder to read.
 */

const KINDS: BotanicalKind[] = [
  "fern",
  "sprig",
  "flower",
  "daisy",
  "leaf",
  "bud",
  "petal",
];

/** Roughly one specimen per this many pixels of page. */
const SPACING = 460;
const MIN_SPECIMENS = 6;
const MAX_SPECIMENS = 90;

/**
 * Hash-based pseudo-random, so a given specimen always comes out the
 * same. Math.random() here would reshuffle the whole page on every
 * re-render, and the flowers would visibly jump.
 */
function rand(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function pageHeight(): number {
  return Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
    window.innerHeight,
  );
}

export default function PressedBackdrop() {
  const { pathname } = useLocation();
  const [height, setHeight] = useState(0);

  // Re-measure on navigation, on resize, and whenever the page itself
  // grows or shrinks — images finishing, a filter changing the gallery.
  useEffect(() => {
    function measure() {
      setHeight((current) => {
        const next = pageHeight();
        // Ignore small changes so we're not re-rendering constantly.
        return Math.abs(next - current) > 120 ? next : current;
      });
    }

    measure();
    window.addEventListener("resize", measure);

    const observer = new ResizeObserver(measure);
    observer.observe(document.body);

    return () => {
      window.removeEventListener("resize", measure);
      observer.disconnect();
    };
  }, [pathname]);

  if (height === 0) return null;

  const count = Math.min(
    MAX_SPECIMENS,
    Math.max(MIN_SPECIMENS, Math.round(height / SPACING)),
  );

  return (
    <div
      className="pressed-backdrop"
      style={{ height: `${height}px` }}
      aria-hidden="true"
    >
      {Array.from({ length: count }, (_, i) => {
        // A fresh seed per slot, so neighbours don't share values.
        const r1 = rand(i + 1);
        const r2 = rand(i + 101);
        const r3 = rand(i + 211);
        const r4 = rand(i + 307);
        const r5 = rand(i + 401);

        // Alternate sides, keeping clear of the text column.
        const onLeft = i % 2 === 0;
        const inset = 1.5 + r1 * 9;
        const x = onLeft ? inset : 100 - inset;

        // Spread evenly down the page, then jitter so the spacing
        // doesn't read as a ruler.
        const band = height / count;
        const y = band * i + band * (0.15 + r2 * 0.7);

        const kind = KINDS[Math.floor(r3 * KINDS.length) % KINDS.length];
        const color =
          BOTANICAL_COLORS[
            Math.floor(r4 * BOTANICAL_COLORS.length) % BOTANICAL_COLORS.length
          ];

        return (
          <span
            className="pressed-specimen"
            key={i}
            style={{
              left: `${x}%`,
              top: `${Math.round(y)}px`,
              opacity: 0.13 + r5 * 0.11,
              animationDelay: `${(r2 * 8).toFixed(2)}s`,
              ["--specimen-rotate" as string]: `${(r4 * 80 - 40).toFixed(1)}deg`,
            }}
          >
            <Botanical
              kind={kind}
              color={color}
              size={Math.round(52 + r1 * 86)}
              stroke={0.8}
            />
          </span>
        );
      })}
    </div>
  );
}
