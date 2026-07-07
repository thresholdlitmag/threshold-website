import { Link, useParams } from "react-router-dom";
import PlaceholderImage from "../components/PlaceholderImage";
import WorkText from "../components/WorkText";
import { WORKS, getWork, resolveImageUrl, typeLabel } from "../data/works";

export default function WorkPage() {
  const { id } = useParams<{ id: string }>();
  const work = id ? getWork(id) : undefined;

  if (!work) {
    return (
      <div className="page container" style={{ textAlign: "center" }}>
        <h1 className="page-title">Not Found</h1>
        <p className="lede" style={{ margin: "0 auto 2rem" }}>
          We couldn't find that piece.
        </p>
        <Link className="btn" to="/gallery">
          Back to the Gallery
        </Link>
      </div>
    );
  }

  const index = WORKS.indexOf(work);
  const prev = WORKS[index - 1];
  const next = WORKS[index + 1];

  return (
    <div className="page container">
      <div className="work-page__top">
        <Link className="kicker" to="/gallery">
          Back to the Gallery
        </Link>
      </div>

      <header className="work-page__header">
        <h1 className="page-title">{work.title}</h1>
        <p className="byline">
          By {work.author} &middot; {typeLabel(work)} &middot; {work.edition}
        </p>
      </header>

      <hr className="rule-double" style={{ marginTop: "0.6rem" }} />

      <div className="work-page__content">
        {work.type === "art" ? (
          work.imageUrl ? (
            <figure className="figure">
              <img
                className="work-page__img"
                src={resolveImageUrl(work.imageUrl)}
                alt={`${work.title} — ${work.medium} by ${work.author}`}
              />
              <figcaption>
                {work.title} &middot; {work.medium} &middot; {work.author}
              </figcaption>
            </figure>
          ) : (
            <PlaceholderImage
              ratio="4 / 3"
              framed
              caption={`${work.title} — artwork coming soon`}
            />
          )
        ) : work.fullText ? (
          <WorkText text={work.fullText} type={work.type} dropcap />
        ) : work.excerpt ? (
          <>
            <WorkText
              text={work.excerpt.split(" / ").join("\n")}
              type={work.type}
              dropcap={work.type === "prose"}
            />
            <p className="byline" style={{ marginTop: "2rem" }}>
              Excerpt — full piece coming soon
            </p>
          </>
        ) : (
          <p className="lede">Full text coming soon.</p>
        )}
      </div>

      <nav className="work-page__nav" aria-label="More works">
        {prev ? (
          <Link to={`/gallery/${prev.id}`}>&larr; {prev.title}</Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/gallery/${next.id}`}>{next.title} &rarr;</Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
