import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PlaceholderImage from "../components/PlaceholderImage";
import {
  EDITIONS,
  WORKS,
  WorkType,
  resolveImageUrl,
  typeLabel,
} from "../data/works";

type Filter = WorkType | "all";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All Works" },
  { value: "poetry", label: "Poetry" },
  { value: "prose", label: "Prose" },
  { value: "art", label: "Art" },
];

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [edition, setEdition] = useState<string>("all");

  const works = useMemo(
    () =>
      WORKS.filter(
        (work) =>
          (filter === "all" || work.type === filter) &&
          (edition === "all" || work.edition === edition),
      ),
    [filter, edition],
  );

  return (
    <div className="page container">
      <span className="kicker">Writing &amp; Art from Our Pages</span>
      <h1 className="page-title">Gallery</h1>
      <p className="lede">
        Lorem ipsum dolor sit amet — every published work from every edition
        of Threshold, in one collection.
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
              {work.type === "art" ? (
                work.imageUrl ? (
                  <figure className="figure">
                    <img
                      src={resolveImageUrl(work.imageUrl)}
                      alt={`${work.title} — ${work.medium} by ${work.author}`}
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
        “Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
        suscipit laboriosam.”
        <cite>— From the pages of Threshold (placeholder)</cite>
      </blockquote>
    </div>
  );
}
