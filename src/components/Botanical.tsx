/**
 * The pressed-botanical set.
 *
 * Everything is drawn on a 40×40 grid with flat fills and a thin ink
 * outline, the way a flower looks after a fortnight under a heavy book:
 * slightly flattened, a little asymmetric, veins showing through.
 *
 * Used by the scattered page backdrop, the click bloom, and the falling
 * petals.
 */

export type BotanicalKind =
  | "flower"
  | "daisy"
  | "petal"
  | "leaf"
  | "sprig"
  | "fern"
  | "bud";

/** Petal colours, chosen to sit inside the creme/navy/lavender palette. */
export const BOTANICAL_COLORS = [
  "#d2d5f3", // lavender
  "#e8d5e8", // dusty pink
  "#c9cdef", // deeper lavender
  "#f0e2d0", // pressed cream
  "#dcd3ee", // wisteria
  "#cfe0d8", // faded sage
] as const;

const INK = "#121434";

interface BotanicalProps {
  kind?: BotanicalKind;
  color?: string;
  size?: number;
  /** Outline weight. Thinner reads as more faded/pressed. */
  stroke?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Botanical({
  kind = "flower",
  color = BOTANICAL_COLORS[0],
  size = 24,
  stroke = 1.1,
  className = "",
  style,
}: BotanicalProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      {shapeFor(kind, color, stroke)}
    </svg>
  );
}

function shapeFor(kind: BotanicalKind, color: string, stroke: number) {
  const ink = {
    stroke: INK,
    strokeWidth: stroke,
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
  };

  switch (kind) {
    /* Five broad petals around a pale centre. */
    case "flower":
      return (
        <>
          <g fill={color} {...ink}>
            {[0, 72, 144, 216, 288].map((angle) => (
              <ellipse
                key={angle}
                cx="20"
                cy="8.5"
                rx="5.4"
                ry="8"
                transform={`rotate(${angle} 20 20)`}
              />
            ))}
          </g>
          <circle cx="20" cy="20" r="4.2" fill="#f4f3ed" {...ink} />
        </>
      );

    /* Many narrow petals — a pressed aster or daisy. */
    case "daisy":
      return (
        <>
          <g fill={color} {...ink} strokeWidth={stroke * 0.8}>
            {Array.from({ length: 11 }, (_, i) => (i * 360) / 11).map(
              (angle) => (
                <ellipse
                  key={angle}
                  cx="20"
                  cy="9"
                  rx="2.5"
                  ry="8.4"
                  transform={`rotate(${angle} 20 20)`}
                />
              ),
            )}
          </g>
          <circle cx="20" cy="20" r="4.6" fill="#f0e2d0" {...ink} />
        </>
      );

    /*
      A single petal. Falls far more convincingly than a whole flower —
      one petal turning over in the air is what you actually see.
    */
    case "petal":
      return (
        <>
          <path
            d="M20 3 C29 11, 31 25, 20 37 C9 25, 11 11, 20 3 Z"
            fill={color}
            {...ink}
          />
          <path
            d="M20 8 C21.5 17, 21 27, 20 33"
            fill="none"
            stroke={INK}
            strokeWidth={stroke * 0.6}
            strokeLinecap="round"
            opacity="0.45"
          />
        </>
      );

    /* One pressed leaf, midrib and side veins showing. */
    case "leaf":
      return (
        <>
          <path
            d="M20 3 C32 13, 31 28, 20 37 C9 28, 8 13, 20 3 Z"
            fill={color}
            {...ink}
          />
          <g
            fill="none"
            stroke={INK}
            strokeWidth={stroke * 0.55}
            strokeLinecap="round"
            opacity="0.5"
          >
            <path d="M20 5 L20 35" />
            <path d="M20 13 L26 10" />
            <path d="M20 19 L27 17" />
            <path d="M20 25 L25 24" />
            <path d="M20 13 L14 10" />
            <path d="M20 19 L13 17" />
            <path d="M20 25 L15 24" />
          </g>
        </>
      );

    /* A stem with paired leaves and a bud at the tip. */
    case "sprig":
      return (
        <>
          <path
            d="M20 38 C20 28, 19 16, 20 4"
            fill="none"
            stroke={INK}
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          <g fill={color} {...ink} strokeWidth={stroke * 0.85}>
            <ellipse cx="14" cy="27" rx="5.6" ry="3" transform="rotate(-28 14 27)" />
            <ellipse cx="26" cy="22" rx="5.6" ry="3" transform="rotate(28 26 22)" />
            <ellipse cx="14.5" cy="17" rx="4.8" ry="2.6" transform="rotate(-32 14.5 17)" />
            <ellipse cx="25" cy="12" rx="4.4" ry="2.4" transform="rotate(32 25 12)" />
            <ellipse cx="20" cy="6" rx="2.9" ry="4.2" />
          </g>
        </>
      );

    /* A frond — a spine with small pinnae stepping down both sides. */
    case "fern":
      return (
        <>
          <path
            d="M20 38 C20.5 26, 19.5 14, 20 3"
            fill="none"
            stroke={INK}
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          <g fill={color} {...ink} strokeWidth={stroke * 0.7}>
            {[
              { y: 32, r: 5.4 },
              { y: 27, r: 5 },
              { y: 22, r: 4.4 },
              { y: 17, r: 3.7 },
              { y: 12, r: 2.9 },
              { y: 8, r: 2.1 },
            ].map((row) => (
              <g key={row.y}>
                <ellipse
                  cx={20 - row.r}
                  cy={row.y}
                  rx={row.r}
                  ry={row.r * 0.42}
                  transform={`rotate(-30 ${20 - row.r} ${row.y})`}
                />
                <ellipse
                  cx={20 + row.r}
                  cy={row.y - 2}
                  rx={row.r}
                  ry={row.r * 0.42}
                  transform={`rotate(30 ${20 + row.r} ${row.y - 2})`}
                />
              </g>
            ))}
          </g>
        </>
      );

    /* A closed bud on a short stem. */
    case "bud":
      return (
        <>
          <path
            d="M20 38 L20 22"
            fill="none"
            stroke={INK}
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          <path
            d="M20 4 C27 11, 27 19, 20 24 C13 19, 13 11, 20 4 Z"
            fill={color}
            {...ink}
          />
          <path
            d="M20 24 C16 23, 14 26, 13 29"
            fill="none"
            stroke={INK}
            strokeWidth={stroke * 0.8}
            strokeLinecap="round"
          />
        </>
      );
  }
}
