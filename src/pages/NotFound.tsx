import { Link } from "react-router-dom";

/**
 * The catch-all page.
 *
 * Anything that isn't a real route lands here: a mistyped address, a
 * link to a piece that has since been pulled, an old URL from a shared
 * screenshot. Before this existed those all rendered the header, nav and
 * footer wrapped around nothing at all, which reads as a broken site
 * rather than a wrong address.
 *
 * It offers somewhere to go rather than just apologising — a 404 that
 * dead-ends is the one that actually loses the reader.
 */

/** Where someone who took a wrong turn most likely meant to end up. */
const WAYS_BACK = [
  { to: "/gallery", label: "Gallery", note: "Every published piece" },
  { to: "/submit", label: "Submit", note: "Send us your work" },
  { to: "/masthead", label: "Masthead", note: "Meet the editors" },
  { to: "/events", label: "Events", note: "What's coming up" },
];

export default function NotFound() {
  return (
    <div className="page container page--centered">
      <span className="kicker">Off the edge of the page</span>
      <h1 className="page-title">Page Not Found</h1>
      <p className="lede">
        We can't find what you're looking for. It may have moved, or the
        address may have a typo in it.
      </p>

      <hr className="rule-double" />

      <div className="notfound__actions">
        <Link className="btn" to="/">
          Back to the Front Page
        </Link>
        <Link className="btn btn--ghost" to="/gallery">
          Browse the Gallery
        </Link>
      </div>

      <div className="section-head">
        <h2>Try One of These</h2>
        <span>The rest of the magazine</span>
      </div>
      <section className="grid-auto">
        {WAYS_BACK.map((way) => (
          <article className="card" key={way.to}>
            <h3>
              <Link to={way.to}>{way.label}</Link>
            </h3>
            <p>{way.note}</p>
          </article>
        ))}
      </section>

      <blockquote className="pullquote">
        “Not all those who wander are lost.”
        <cite>— J.R.R. Tolkien</cite>
      </blockquote>
    </div>
  );
}
