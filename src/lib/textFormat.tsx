import { ReactNode } from "react";

/**
 * A small formatting syntax for the writing in data/works.ts.
 *
 * Poems are not plain paragraphs. A line may want to sit to the right of
 * the page, a refrain may want centring, a word may want emphasis — and
 * none of that survives a text field that only understands line breaks.
 * This adds the smallest set of tags that covers what poets actually ask
 * for, in a form an editor can type without knowing any HTML.
 *
 * ── the tags ─────────────────────────────────────────────────────────
 *
 *   [i]…[/i]   italic
 *   [b]…[/b]   bold          (these nest: [b]bold [i]and italic[/i][/b])
 *
 *   [center]…[/center]       alignment. Either wrap a single line:
 *   [right]…[/right]
 *   [left]…[/left]               [center]a centred line[/center]
 *
 *                            …or put the tag alone on its own line to
 *                            align everything until it is closed:
 *
 *                                [right]
 *                                three lines
 *                                all sitting
 *                                to the right
 *                                [/right]
 *
 * Leading spaces are preserved, so a poem can be indented by typing
 * spaces at the start of a line the way it would be on paper.
 *
 * Anything that isn't a recognised tag is left exactly as written, and
 * so is a tag that is never closed — a typo shows up on the page as the
 * text you typed rather than silently swallowing the rest of the poem.
 */

export type Align = "left" | "center" | "right";

export interface FormattedLine {
  text: string;
  align: Align;
}

export interface FormattedBlock {
  /** The lines of one stanza or paragraph. */
  lines: FormattedLine[];
  /** Alignment of the block as a whole, used for prose paragraphs. */
  align: Align;
}

/* An alignment tag alone on its line opens or closes a run. */
const OPEN_ONLY = /^\[(left|center|right)\]$/;
const CLOSE_ONLY = /^\[\/(left|center|right)\]$/;
/* An alignment tag wrapping an entire line aligns just that line. */
const WHOLE_LINE = /^\[(left|center|right)\]([\s\S]*)\[\/(left|center|right)\]$/;

/* Inline emphasis. Both spellings of each so `[em]` and `[strong]` work
   for anyone who reaches for the HTML name. */
const INLINE: Record<string, "em" | "strong"> = {
  i: "em",
  em: "em",
  b: "strong",
  strong: "strong",
};
const INLINE_OPEN = /\[(i|b|em|strong)\]/;

/**
 * Index of the `[/tag]` matching an already-consumed `[tag]`, or -1.
 *
 * Counts depth rather than taking the first closer, so the inner pair in
 * `[b]one [b]two[/b] three[/b]` closes before the outer one does.
 */
function findClose(source: string, tag: string): number {
  const open = `[${tag}]`;
  const close = `[/${tag}]`;
  let depth = 0;
  let i = 0;

  while (i < source.length) {
    if (source.startsWith(close, i)) {
      if (depth === 0) return i;
      depth -= 1;
      i += close.length;
    } else if (source.startsWith(open, i)) {
      depth += 1;
      i += open.length;
    } else {
      i += 1;
    }
  }
  return -1;
}

/** Turns the inline tags in one line into `<em>` / `<strong>` nodes. */
export function renderInline(text: string): ReactNode {
  const out: ReactNode[] = [];
  let rest = text;
  let key = 0;

  while (rest.length > 0) {
    const open = INLINE_OPEN.exec(rest);
    if (!open) {
      out.push(rest);
      break;
    }

    if (open.index > 0) out.push(rest.slice(0, open.index));

    const tag = open[1];
    const after = rest.slice(open.index + open[0].length);
    const closeAt = findClose(after, tag);

    // Never closed — print the tag as typed and carry on, so the mistake
    // is visible instead of eating everything after it.
    if (closeAt < 0) {
      out.push(open[0]);
      rest = after;
      continue;
    }

    const Element = INLINE[tag];
    out.push(
      <Element key={key++}>{renderInline(after.slice(0, closeAt))}</Element>,
    );
    // `[/` + tag + `]`
    rest = after.slice(closeAt + tag.length + 3);
  }

  return out;
}

/**
 * Splits a piece into blocks (stanzas or paragraphs) and resolves each
 * line's alignment. Inline tags are left in the text for `renderInline`.
 */
export function parseFormatted(text: string): FormattedBlock[] {
  const blocks: FormattedBlock[] = [];
  const runs: Align[] = [];
  let lines: FormattedLine[] = [];

  function flush() {
    if (lines.length === 0) return;
    blocks.push({ lines, align: lines[0].align });
    lines = [];
  }

  for (const raw of text.split("\n")) {
    // Trailing whitespace is invisible noise; leading whitespace is the
    // poet's indent, so only one end gets trimmed.
    const line = raw.replace(/\s+$/, "");
    const trimmed = line.trim();

    // A blank line ends the stanza.
    if (trimmed === "") {
      flush();
      continue;
    }

    const open = OPEN_ONLY.exec(trimmed);
    if (open) {
      runs.push(open[1] as Align);
      continue;
    }

    const close = CLOSE_ONLY.exec(trimmed);
    if (close) {
      // Only close the run it actually names, so a stray `[/right]`
      // can't cancel an open `[center]`.
      if (runs[runs.length - 1] === close[1]) runs.pop();
      continue;
    }

    const runAlign = runs.length > 0 ? runs[runs.length - 1] : "left";
    const whole = WHOLE_LINE.exec(trimmed);

    if (whole && whole[1] === whole[3]) {
      lines.push({ text: whole[2], align: whole[1] as Align });
    } else {
      lines.push({ text: line, align: runAlign });
    }
  }

  flush();
  return blocks;
}

/**
 * Inline tags only, for the short excerpts on gallery and home cards.
 *
 * Without this a poem formatted with `[i]` would show the brackets
 * themselves on its card while reading correctly on its own page.
 */
export default function Formatted({ text }: { text: string }) {
  return <>{renderInline(text)}</>;
}
