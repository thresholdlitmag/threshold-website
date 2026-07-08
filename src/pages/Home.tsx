import { useMemo } from "react";
import { Link } from "react-router-dom";
import PlaceholderImage from "../components/PlaceholderImage";
import WorkText from "../components/WorkText";
import {
  homeSelection,
  isVisual,
  resolveImageUrl,
  typeLabel,
} from "../data/works";

export default function Home() {
  // Random picks, fixed for this visit (useMemo keeps them stable
  // across re-renders; a page refresh draws a new set).
  const { hero, artwork, highlights, inThisIssue } = useMemo(homeSelection, []);
  // Show the full piece if it's been added; otherwise preview the excerpt.
  const heroText = hero.fullText ?? hero.excerpt?.split(" / ").join("\n");

  return (
    <div className="page container">
      {/* -------- featured work, straight from the gallery -------- */}
      <section className="hero">
        <article>
          <span className="kicker">Featured &middot; From {hero.edition}</span>
          <h2 className="hero__headline">
            <Link to={`/gallery/${hero.id}`}>{hero.title}</Link>
          </h2>
          <p className="byline">
            By {hero.author} &middot; {typeLabel(hero)}
          </p>
          {heroText ? (
            <div className="two-col">
              <WorkText text={heroText} type={hero.type} limit={3} dropcap />
            </div>
          ) : hero.imageUrl ? (
            <img
              className="work-page__img"
              src={resolveImageUrl(hero.imageUrl)}
              alt={`${hero.title} by ${hero.author}`}
            />
          ) : (
            <PlaceholderImage ratio="16 / 10" framed />
          )}
          <p style={{ marginTop: "1.6rem" }}>
            <Link className="btn btn--ghost" to={`/gallery/${hero.id}`}>
              Read the Full Piece
            </Link>
          </p>
        </article>

        <aside className="sidebar">
          {artwork && (
            <Link to={`/gallery/${artwork.id}`} className="sidebar__art">
              {artwork.imageUrl ? (
                <figure className="figure">
                  <img
                    className="work-page__img"
                    src={resolveImageUrl(artwork.imageUrl)}
                    alt={`${artwork.title} — ${artwork.medium} by ${artwork.author}`}
                  />
                  <figcaption>
                    {artwork.title} &middot; {artwork.medium} &middot;{" "}
                    {artwork.author}
                  </figcaption>
                </figure>
              ) : (
                <PlaceholderImage
                  ratio="4 / 5"
                  framed
                  caption={`${artwork.title} · ${artwork.medium} · ${artwork.author}`}
                />
              )}
            </Link>
          )}
          <div className="sidebar__box">
            <h3>In This Issue</h3>
            <ul>
              {inThisIssue.map((piece) => (
                <li key={piece.id}>
                  <Link to={`/gallery/${piece.id}`}>{piece.title}</Link>
                  <em>{typeLabel(piece)}</em>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <hr className="rule-double" />

      {/* -------- welcome blurb -------- */}
      <section className="grid-2">
        <div>
          <span className="kicker">Welcome to Threshold</span>
          <h2 className="page-title" style={{ fontSize: "2.2rem" }}>
            A forum for student work since 1986
          </h2>
          <div className="prose">
            <p>
              <i>Threshold</i> is a forum for student work. This magazine was
              founded on the premise that all fields hold opportunities for
              creative expression, and that we can find the essential human
              creation in everything we create.
            </p>
            <p>
              Each year, our student editors gather poetry, prose, art, and
              music from across the school and shape them into a new edition —
              now in our thirty-ninth volume.
            </p>
          </div>
          <p style={{ marginTop: "1.6rem" }}>
            <Link className="btn btn--ghost" to="/about">
              Read Our Story
            </Link>
          </p>
        </div>
        <PlaceholderImage ratio="16 / 11" caption="Photo — editorial team at work" />
      </section>

      {/* -------- submissions call-out -------- */}
      <section className="callout">
        <div>
          <span className="kicker">Submissions Open</span>
          <h2>Send us your poetry, prose, and art</h2>
          <p>
            Every edition of <i>Threshold</i> is built from student
            submissions — we read every piece with care, and we'd love to
            read yours.
          </p>
        </div>
        <div className="callout__action">
          <Link className="btn" to="/submit">
            Submit Your Work
          </Link>
        </div>
      </section>

      {/* -------- recent highlights, straight from the gallery -------- */}
      <div className="section-head">
        <h2>Recent Highlights</h2>
        <span>Selected by the editors</span>
      </div>
      <section className="grid-3">
        {highlights.map((piece) => (
          <article className="card" key={piece.id}>
            <Link to={`/gallery/${piece.id}`} className="work__link">
              {isVisual(piece) ? (
                piece.imageUrl ? (
                  <img
                    className="work__img"
                    src={resolveImageUrl(piece.imageUrl)}
                    alt={`${piece.title} by ${piece.author}`}
                  />
                ) : (
                  <PlaceholderImage ratio="16 / 10" />
                )
              ) : (
                <blockquote className="work__text">
                  {piece.excerpt?.split(" / ").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </blockquote>
              )}
            </Link>
            <h3>
              <Link to={`/gallery/${piece.id}`}>{piece.title}</Link>
            </h3>
            <p className="byline" style={{ marginBottom: "0.4rem" }}>
              {piece.author} &middot; {typeLabel(piece)}
            </p>
          </article>
        ))}
      </section>

      {/* -------- pull quote -------- */}
      <blockquote className="pullquote">
        “Let me live, love, and say it well in good sentences."
        <cite>— Sylvia Plath</cite>
      </blockquote>
    </div>
  );
}
