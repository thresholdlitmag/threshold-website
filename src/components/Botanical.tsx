/**
 * The pressed-botanical set, drawn as ink line-work.
 *
 * No colour fill — these are specimens rendered the way an old herbarium
 * plate or a field-guide engraving does it, in a single ink on paper.
 * What stops that reading as clip art is detail:
 *
 *  - Real venation. A midrib that runs off-centre, secondary veins that
 *    curve toward the tip and never quite mirror each other, and
 *    tertiary cross-veins between them.
 *  - Structure inside the flower — stamens on filaments, a stippled disc
 *    — rather than a plain circle in the middle.
 *  - Irregular outlines. Every shape is a hand-set bezier, and no two
 *    petals on a flower share a shape, a size, or an angle apart.
 *
 * With no colour, line weight carries the whole drawing: the outline,
 * the veins and the finest work are each set at a different weight and
 * opacity.
 */

export type BotanicalKind =
  | "flower"
  | "daisy"
  | "petal"
  | "leaf"
  | "sprig"
  | "fern"
  | "bud";

const INK = "#121434";

/**
 * Shapes are filled with the paper itself — no hue, but opaque.
 *
 * This matters more than it sounds. Petals radiate from a single point,
 * so with a see-through fill every petal's outline crossed every other
 * one and the middle of a flower became a tangle of lines rather than a
 * flower. An opaque paper fill lets each petal occlude the ones behind
 * it, which is exactly how an engraving resolves the same problem.
 */
const PAPER = "#faf9f3";

/* Petals radiating from the centre, three lopsided variants. */
const PETALS = [
  "M20 20 C15.6 16.2 13.4 11.2 14.5 7.2 C15.3 4 17.5 2.5 20 2.5 C22.6 2.5 24.8 4.4 25.5 7.6 C26.4 11.7 24.3 16.6 20 20 Z",
  "M20 20 C16.2 16.8 13.2 11.8 14 7.6 C14.6 4.4 17.2 2.8 19.6 3 C22.2 3.2 24.4 5.2 25 8.4 C25.7 12.4 23.8 16.9 20 20 Z",
  "M20 20 C15.2 17 13.8 11.6 14.8 7.8 C15.6 4.6 17.8 3.2 20.2 3.4 C22.6 3.6 24.6 5.6 25.2 8.8 C25.9 12.6 23.9 17.2 20 20 Z",
];

/* The veins that fan up through a petal from its base. */
const PETAL_VEINS = [
  "M20 18.4 C19.6 14 19.7 9.2 20 5.6",
  "M20 18.4 C18.4 14.8 17.3 10.6 17.6 7.6",
  "M20 18.4 C21.6 14.8 22.8 10.8 22.5 7.8",
];

const NARROW_PETAL =
  "M20 20 C18.3 15.4 17.5 9.6 18.3 5.8 C18.8 3.4 19.5 2.6 20 2.6 C20.6 2.6 21.3 3.7 21.8 6.1 C22.5 10 21.7 15.7 20 20 Z";

const LOOSE_PETAL =
  "M20.4 3.2 C25.8 8.4 29.4 15.6 28.6 22.6 C27.9 28.8 23.9 34.4 19.6 37.2 C16 34 12.3 28.4 11.8 21.6 C11.3 14.6 15 8 20.4 3.2 Z";

/* An ovate leaf with a drawn-out tip and an uneven margin. */
const LEAF =
  "M20 2.2 C23.2 7.4 26.4 10.4 28.4 14.2 C30.4 18 30.9 22.4 29.4 26.2 C27.8 30.6 24.2 34.4 20 37.8 C15.6 34.2 12 30.4 10.5 26 C9.2 22.2 9.8 17.8 11.8 14 C13.8 10.2 16.9 7.3 20 2.2 Z";

/* Midrib first, then five pairs of secondaries — deliberately unmatched. */
const LEAF_VEINS = [
  "M20 4.4 C20.6 13 20.3 26 19.9 36",
  "M20.1 9.4 C22.5 10.8 24.7 12.6 26.1 14.9",
  "M20.2 14.6 C23 16 25.7 18.2 27.3 20.7",
  "M20.2 20 C22.9 21.5 25.2 23.6 26.6 25.9",
  "M20.1 25.2 C22.3 26.6 24.1 28.4 25.2 30.3",
  "M20 30 C21.6 31.2 22.9 32.6 23.6 34.1",
  "M19.9 10.6 C17.6 11.8 15.5 13.6 14.2 15.8",
  "M19.8 15.8 C17.1 17.2 14.7 19.2 13.3 21.6",
  "M19.8 21.2 C17.3 22.6 15.3 24.4 14.1 26.6",
  "M19.9 26.4 C18 27.7 16.5 29.2 15.6 31",
];

/* Cross-veins — the thing that makes a leaf read as observed. */
const LEAF_TERTIARY = [
  "M22.6 11.6 C22.2 13.2 22.6 14.6 23.6 15.7",
  "M23.4 17.2 C23 18.8 23.4 20.2 24.4 21.3",
  "M16.6 13 C17 14.5 16.7 15.9 15.8 16.9",
  "M15.9 18.6 C16.3 20.1 16 21.5 15.1 22.5",
];

interface BotanicalProps {
  kind?: BotanicalKind;
  size?: number;
  /** Outline weight. The veins and fine work scale from this. */
  stroke?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Botanical({
  kind = "flower",
  size = 24,
  stroke = 0.62,
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
      {shapeFor(kind, stroke)}
    </svg>
  );
}

function shapeFor(kind: BotanicalKind, stroke: number) {
  /* Three weights: the outline, the veins, and the finest detail. */
  const outline = {
    fill: PAPER,
    fillOpacity: 0.95,
    stroke: INK,
    strokeOpacity: 0.62,
    strokeWidth: stroke,
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
  };
  const vein = {
    fill: "none",
    stroke: INK,
    strokeOpacity: 0.4,
    strokeWidth: stroke * 0.55,
    strokeLinecap: "round" as const,
  };
  const fine = {
    fill: "none",
    stroke: INK,
    strokeOpacity: 0.26,
    strokeWidth: stroke * 0.38,
    strokeLinecap: "round" as const,
  };

  switch (kind) {
    /* Five veined petals around a stamened centre. */
    case "flower": {
      const angles = [0, 71, 147, 214, 288];
      const scales = [1, 0.94, 1.05, 0.97, 1.02];
      const stamens = [18, 78, 143, 212, 276, 330];
      return (
        <>
          {angles.map((angle, i) => (
            <g
              key={angle}
              transform={`rotate(${angle} 20 20) translate(20 20) scale(${scales[i]}) translate(-20 -20)`}
            >
              <path d={PETALS[i % PETALS.length]} {...outline} />
              {PETAL_VEINS.map((d, j) => (
                <path key={j} d={d} {...(j === 0 ? vein : fine)} />
              ))}
            </g>
          ))}
          {/*
            The disc goes on AFTER the petals, covering the point where
            all five converge — otherwise every petal tip meets in one
            knot of crossing lines at the centre.
          */}
          <circle
            cx="20"
            cy="20"
            r="3.1"
            fill={PAPER}
            stroke={INK}
            strokeOpacity="0.55"
            strokeWidth={stroke * 0.75}
          />
          {/* Short filaments out to a small anther, at uneven angles. */}
          {stamens.map((angle, i) => (
            <g key={angle} transform={`rotate(${angle} 20 20)`}>
              <path
                d={`M20 19 C19.85 18 19.9 17.4 20 ${16.4 - (i % 3) * 0.55}`}
                {...fine}
                strokeOpacity={0.42}
              />
              <circle
                cx="20"
                cy={16.1 - (i % 3) * 0.55}
                r="0.5"
                fill={INK}
                fillOpacity="0.42"
              />
            </g>
          ))}
        </>
      );
    }

    /* A ray-flowered aster: narrow florets and a stippled disc. */
    case "daisy": {
      const angles = [
        0, 29, 57, 86, 113, 142, 171, 199, 228, 256, 285, 313, 341,
      ];
      const dots = [
        [20, 18.2],
        [21.8, 19],
        [18.3, 19.4],
        [20.6, 20.6],
        [19, 21.4],
        [21.6, 21.8],
        [17.9, 21],
        [20.2, 22.6],
      ];
      return (
        <>
          {angles.map((angle, i) => (
            <g
              key={angle}
              transform={`rotate(${angle} 20 20) translate(20 20) scale(${
                0.88 + ((i * 41) % 22) / 100
              }) translate(-20 -20)`}
            >
              <path d={NARROW_PETAL} {...outline} strokeWidth={stroke * 0.82} />
              <path d="M20 18.6 C19.9 14.4 19.9 9.4 20 5.6" {...fine} />
            </g>
          ))}
          {/* Again drawn last, over the point the florets meet. */}
          <circle
            cx="20"
            cy="20.4"
            r="4.4"
            fill={PAPER}
            stroke={INK}
            strokeOpacity="0.55"
            strokeWidth={stroke * 0.8}
          />
          {dots.map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="0.55"
              fill={INK}
              fillOpacity="0.34"
            />
          ))}
        </>
      );
    }

    /* One fallen petal, veins fanning from the base. */
    case "petal":
      return (
        <>
          <path d={LOOSE_PETAL} {...outline} />
          <path d="M20.2 6.4 C21.8 15.4 21.2 26.4 19.7 34.6" {...vein} />
          <g {...fine}>
            <path d="M20.6 12 C22.8 14.4 24.4 17.6 25.2 21.2" />
            <path d="M20.4 18.4 C22.4 20.8 23.8 23.8 24.4 27" />
            <path d="M20 12.6 C17.9 15 16.4 18.2 15.7 21.6" />
            <path d="M19.9 19 C18 21.4 16.8 24.2 16.3 27.2" />
            <path d="M19.8 25.6 C18.9 27.8 18.4 30.2 18.3 32.6" />
          </g>
        </>
      );

    /* A leaf: midrib, secondaries, and cross-veins between them. */
    case "leaf":
      return (
        <>
          <path d={LEAF} {...outline} />
          {LEAF_VEINS.map((d, i) => (
            <path key={i} d={d} {...(i === 0 ? vein : fine)} />
          ))}
          {LEAF_TERTIARY.map((d, i) => (
            <path key={`t${i}`} d={d} {...fine} strokeOpacity={0.18} />
          ))}
        </>
      );

    /*
      A stem of leaflets. Each leaflet is the leaf drawing scaled down,
      so its stroke has to be divided back out — otherwise scaling the
      group would thin the line to nothing.
    */
    case "sprig": {
      const leaflets = [
        { x: 14, y: 28, r: -52, s: 0.32 },
        { x: 26, y: 23.5, r: 54, s: 0.29 },
        { x: 14.5, y: 19, r: -58, s: 0.26 },
        { x: 25.4, y: 14, r: 48, s: 0.23 },
        { x: 15.6, y: 10, r: -46, s: 0.19 },
      ];
      return (
        <>
          <path
            d="M20.6 38 C19.4 30 20.2 20 19.4 12 C19 8 19.6 5.4 20 3.4"
            fill="none"
            stroke={INK}
            strokeOpacity="0.5"
            strokeWidth={stroke * 1.1}
            strokeLinecap="round"
          />
          {leaflets.map((l, i) => (
            <g
              key={i}
              transform={`translate(${l.x} ${l.y}) rotate(${l.r}) scale(${l.s}) translate(-20 -20)`}
            >
              <path d={LEAF} {...outline} strokeWidth={stroke / l.s / 3.4} />
              <path d={LEAF_VEINS[0]} {...fine} strokeWidth={stroke / l.s / 6} />
            </g>
          ))}
          {/* The unopened tip. */}
          <path
            d="M20 3.2 C22.6 5.8 23.4 9 22.1 11.6 C21.2 13.3 18.8 13.4 17.9 11.7 C16.5 9 17.4 5.7 20 3.2 Z"
            {...outline}
          />
          <path d="M20 5 C20.2 7.6 20.1 10 19.9 12.2" {...fine} />
        </>
      );
    }

    /* A frond: a rachis with pinnae shrinking toward the tip. */
    case "fern": {
      const rows = [
        { y: 34, s: 0.29 },
        { y: 29.6, s: 0.27 },
        { y: 25.2, s: 0.24 },
        { y: 20.8, s: 0.21 },
        { y: 16.4, s: 0.17 },
        { y: 12.2, s: 0.13 },
        { y: 8.4, s: 0.09 },
      ];
      return (
        <>
          <path
            d="M20.8 38.4 C19.2 30 21 21 19.6 12.4 C19 8.6 19.4 5.4 19.8 2.8"
            fill="none"
            stroke={INK}
            strokeOpacity="0.5"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          {rows.map((row, i) => {
            // Offset from the leaf's own half-width, so a pinna always
            // meets the rachis instead of floating beside it.
            const offset = 11 * row.s + 1.1;
            return (
              <g key={row.y}>
                <g
                  transform={`translate(${(20 - offset).toFixed(2)} ${
                    row.y
                  }) rotate(-56) scale(${row.s}) translate(-20 -20)`}
                >
                  <path d={LEAF} {...outline} strokeWidth={stroke / row.s / 4} />
                  <path
                    d={LEAF_VEINS[0]}
                    {...fine}
                    strokeWidth={stroke / row.s / 7}
                  />
                </g>
                <g
                  transform={`translate(${(20 + offset).toFixed(2)} ${(
                    row.y -
                    2 -
                    i * 0.2
                  ).toFixed(2)}) rotate(56) scale(${(row.s * 0.94).toFixed(
                    3,
                  )}) translate(-20 -20)`}
                >
                  <path d={LEAF} {...outline} strokeWidth={stroke / row.s / 4} />
                  <path
                    d={LEAF_VEINS[0]}
                    {...fine}
                    strokeWidth={stroke / row.s / 7}
                  />
                </g>
              </g>
            );
          })}
        </>
      );
    }

    /* A closed bud: overlapping sepals on a stem. */
    case "bud":
      return (
        <>
          <path
            d="M20.4 38 C19.6 32 20 27.6 19.8 23.6"
            fill="none"
            stroke={INK}
            strokeOpacity="0.5"
            strokeWidth={stroke * 1.1}
            strokeLinecap="round"
          />
          <path
            d="M19.8 3.6 C25 8.4 27.6 14.4 26.4 19.6 C25.4 23.6 22.4 25.4 19.6 25 C16.6 24.6 13.8 22.2 13.2 18.2 C12.4 13 15 8 19.8 3.6 Z"
            {...outline}
          />
          {/* The seams where the sepals overlap. */}
          <path d="M19.9 5 C20.6 12.4 20.4 19 19.8 24.6" {...vein} />
          <path d="M19.9 5.6 C17.4 11 16.2 17.4 16.6 23.2" {...fine} />
          <path d="M19.9 5.6 C22.6 11 23.8 17.4 23.2 23.4" {...fine} />
          <path
            d="M16.9 14.6 C18.4 15.4 20.9 15.6 22.9 14.9"
            {...fine}
            strokeOpacity={0.2}
          />
          <path
            d="M19.6 25.2 C16.4 24.8 14 26.8 12.6 30"
            fill="none"
            stroke={INK}
            strokeOpacity="0.44"
            strokeWidth={stroke * 0.9}
            strokeLinecap="round"
          />
        </>
      );
  }
}
