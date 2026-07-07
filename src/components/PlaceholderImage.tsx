interface PlaceholderImageProps {
  /** CSS aspect-ratio, e.g. "16 / 9" or "1" */
  ratio?: string;
  caption?: string;
  framed?: boolean;
  className?: string;
}

/**
 * Lavender placeholder block to be replaced with real artwork/photography.
 * Swap each instance for an <img> once assets are available.
 */
export default function PlaceholderImage({
  ratio = "16 / 10",
  caption,
  framed = false,
  className = "",
}: PlaceholderImageProps) {
  const box = (
    <div
      className={`ph ${framed ? "ph--frame" : ""} ${className}`.trim()}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={caption ?? "Placeholder image"}
    >
      <svg viewBox="0 0 100 80" fill="none" aria-hidden="true">
        <rect
          x="8"
          y="8"
          width="84"
          height="64"
          stroke="#121434"
          strokeWidth="2.5"
        />
        <circle cx="34" cy="30" r="8" stroke="#121434" strokeWidth="2.5" />
        <path
          d="M8 62 L38 42 L58 56 L74 40 L92 54"
          stroke="#121434"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );

  if (!caption) return box;

  return (
    <figure className="figure">
      {box}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
