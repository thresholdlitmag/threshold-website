import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { REVEAL_REFRESH_EVENT } from "../components/ScrollReveal";
import WorkVisual from "../components/WorkVisual";
import {
  VOLUMES,
  WORKS,
  WorkType,
  isVisual,
  shuffle,
  typeLabel,
} from "../data/works";

type Filter = WorkType | "all";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All Works" },
  { value: "poetry", label: "Poetry" },
  { value: "prose", label: "Prose" },
  { value: "art", label: "Art" },
  { value: "music", label: "Music" },
  { value: "spotlight", label: "Spotlight" },
];

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [volume, setVolume] = useState<string>("all");

  // A fresh random order each visit, stable while filtering.
  const ordered = useMemo(() => shuffle(WORKS), []);

  const works = useMemo(
    () =>
      ordered.filter(
        (work) =>
          (filter === "all" || work.type === filter) &&
          (volume === "all" || work.volume === volume),
      ),
    [ordered, filter, volume],
  );

  // A change of filter swaps the whole grid without navigating, so the
  // reveal pass has to be told to look again — otherwise the incoming
  // pieces simply blink into place while the rest of the site settles.
  //
  // Skipped on mount: the reveal pass has just run for this page anyway,
  // and interrupting it there would cut short the animation already
  // playing on the first screenful of work.
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    window.dispatchEvent(new Event(REVEAL_REFRESH_EVENT));
  }, [filter, volume]);

  return (
    <div className="page container">
      <span className="kicker">Writing &amp; Art from Our Pages</span>
      <h1 className="page-title">Gallery</h1>
      <p className="lede">
        Every published work from every volume of Threshold, in one
        collection.
      </p>

      <hr className="rule-double" />

      <div className="gallery-controls">
        <div className="chips" role="group" aria-label="Filter by type">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              // A filter chip is a toggle, not a link — aria-pressed is
              // what tells assistive tech which one is currently on.
              aria-pressed={filter === f.value}
              className={`chip ${filter === f.value ? "chip--active" : ""}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <label className="volume-select">
          Volume
          <select value={volume} onChange={(e) => setVolume(e.target.value)}>
            <option value="all">All volumes</option>
            {VOLUMES.map((vol) => (
              <option key={vol} value={vol}>
                {vol}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/*
        What the filters actually did. aria-live means a screen reader
        hears the new count when the chips change, rather than being left
        to discover the grid has quietly rearranged itself.
      */}
      <p className="result-count" aria-live="polite">
        {works.length} {works.length === 1 ? "piece" : "pieces"}
        {filter === "all" ? "" : ` in ${FILTERS.find((f) => f.value === filter)?.label.toLowerCase()}`}
        {volume === "all" ? "" : ` from ${volume}`}
      </p>

      {/*
        Masonry: the grid flows down CSS columns instead of across fixed
        rows, so a short poem next to a tall painting no longer leaves a
        gap — each card starts right under the one above it.
      */}
      <section className="gallery-grid">
        {works.map((work) => (
          <article className="work" key={work.id}>
            <Link to={`/gallery/${work.id}`} className="work__link">
              {isVisual(work) ? (
                <WorkVisual work={work} />
              ) : (
                <blockquote className="work__text">
                  {work.excerpt?.split(" / ").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </blockquote>
              )}
            </Link>
            <div className="work__meta">
              <h3>
                <Link to={`/gallery/${work.id}`}>{work.title}</Link>
              </h3>
              <p className="byline" style={{ marginBottom: 0 }}>
                {work.author}
              </p>
              <p className="work__tags">
                <span className="tag">{typeLabel(work)}</span>
                <span className="tag tag--volume">{work.volume}</span>
              </p>
            </div>
          </article>
        ))}
      </section>

      {works.length === 0 && (
        <div className="empty-state">
          <p className="lede">
            Nothing in this corner of the archive yet.
          </p>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              setFilter("all");
              setVolume("all");
            }}
          >
            Show Every Piece
          </button>
        </div>
      )}

      <blockquote className="pullquote">
        “Words mean things we didn't know we knew.”
        <cite>— Wyn Cooper, <i>Mars Poetica</i></cite>
      </blockquote>
    </div>
  );
}
