import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PlaceholderImage from "../components/PlaceholderImage";
import {
  EDITIONS,
  WORKS,
  WorkType,
  isVisual,
  resolveImageUrl,
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
  const [edition, setEdition] = useState<string>("all");

  // A fresh random order each visit, stable while filtering.
  const ordered = useMemo(() => shuffle(WORKS), []);

  const works = useMemo(
    () =>
      ordered.filter(
        (work) =>
          (filter === "all" || work.type === filter) &&
          (edition === "all" || work.edition === edition),
      ),
    [ordered, filter, edition],
  );

  return (
    <div className="page container">
      <span className="kicker">Writing &amp; Art from Our Pages</span>
      <h1 className="page-title">Gallery</h1>
      <p className="lede">
        Every published work from every edition of Threshold, in one
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
        <label className="edition-select">
          Edition
          <select value={edition} onChange={(e) => setEdition(e.target.value)}>
            <option value="all">All editions</option>
            {EDITIONS.map((ed) => (
              <option key={ed} value={ed}>
                {ed}
              </option>
            ))}
          </select>
        </label>
      </div>

      <section className="gallery-grid">
        {works.map((work) => (
          <article className="work" key={work.id}>
            <Link to={`/gallery/${work.id}`} className="work__link">
              {isVisual(work) ? (
                work.imageUrl ? (
                  <figure className="figure">
                    <img
                      src={resolveImageUrl(work.imageUrl)}
                      alt={`${work.title} — ${typeLabel(work)} by ${work.author}`}
                      className="work__img"
                    />
                  </figure>
                ) : (
                  <PlaceholderImage ratio="4 / 3" framed />
                )
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
                <span className="tag tag--edition">{work.edition}</span>
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
