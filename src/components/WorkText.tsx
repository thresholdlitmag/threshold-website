import { WorkType } from "../data/works";

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
 */
export default function WorkText({
  text,
  type,
  limit,
  dropcap = false,
}: WorkTextProps) {
  const blocks = text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .slice(0, limit);

  if (type === "poetry") {
    return (
      <div className="poem">
        {blocks.map((stanza, i) => (
          <p key={i}>
            {stanza.split("\n").map((line, j) => (
              <span key={j} className="poem__line">
                {line}
              </span>
            ))}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className="prose">
      {blocks.map((paragraph, i) => (
        <p key={i} className={i === 0 && dropcap ? "dropcap" : undefined}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}
