import { WorkType } from "../data/works";
import { parseFormatted, renderInline } from "../lib/textFormat";

interface WorkTextProps {
  text: string;
  type: WorkType;
  /** Render only the first N stanzas/paragraphs (for previews). */
  limit?: number;
  dropcap?: boolean;
}

/**
 * Renders a work's fullText. Blank lines separate stanzas/paragraphs;
 * within a poetry stanza, single line breaks are preserved.
 *
 * Both alignment and emphasis come from the tag syntax documented in
 * lib/textFormat — `[center]`, `[right]`, `[i]`, `[b]` and so on. A poem
 * with no tags in it renders exactly as it did before.
 */
export default function WorkText({
  text,
  type,
  limit,
  dropcap = false,
}: WorkTextProps) {
  // `slice(0, undefined)` returns the whole array, so an absent limit
  // needs no special case.
  const blocks = parseFormatted(text).slice(0, limit);

  if (type === "poetry") {
    return (
      <div className="poem">
        {blocks.map((stanza, i) => (
          <p key={i}>
            {stanza.lines.map((line, j) => (
              <span
                key={j}
                className={
                  line.align === "left"
                    ? "poem__line"
                    : `poem__line poem__line--${line.align}`
                }
              >
                {renderInline(line.text)}
              </span>
            ))}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className="prose">
      {blocks.map((paragraph, i) => {
        const classes = [
          i === 0 && dropcap ? "dropcap" : "",
          paragraph.align === "left" ? "" : `text-${paragraph.align}`,
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <p key={i} className={classes || undefined}>
            {/* A prose paragraph's lines flow together, so they are
                rejoined and left for the browser to wrap. */}
            {renderInline(paragraph.lines.map((line) => line.text).join("\n"))}
          </p>
        );
      })}
    </div>
  );
}
