import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
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
        <p className="lede" style={{ margin: "3rem auto", textAlign: "center" }}>
          Nothing here yet — check back soon.
        </p>
      )}

      <blockquote className="pullquote">
        “Words mean things we didn't know we knew.”
        <cite>— Wyn Cooper, <i>Mars Poetica</i></cite>
      </blockquote>
    </div>
  );
}
