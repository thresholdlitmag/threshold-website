import { Link } from "react-router-dom";
import PlaceholderImage from "../components/PlaceholderImage";

export default function About() {
  return (
    <div className="page container">
      <span className="kicker">About the Magazine</span>
      <h1 className="page-title">Our Story</h1>
      <p className="lede">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt.
      </p>

      <hr className="rule-double" />

      <section className="grid-2">
        <div className="prose">
          <p className="dropcap">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Sed ut perspiciatis
            unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam.
          </p>
          <p>
            Eaque ipsa quae ab illo inventore veritatis et quasi architecto
            beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
            voluptas sit aspernatur aut odit aut fugit.
          </p>
        </div>
        <PlaceholderImage
          ratio="4 / 5"
          framed
          caption="Photo — the founding editors"
        />
      </section>

      <blockquote className="pullquote">
        “A threshold is not a wall — it is an invitation to step through.”
        <cite>— Our mission, in one line (placeholder)</cite>
      </blockquote>

      <div className="section-head">
        <h2>What We Publish</h2>
        <span>Genres &amp; forms</span>
      </div>
      <section className="grid-3">
        {[
          {
            title: "Poetry",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Free verse, form, prose poems — nulla facilisi.",
          },
          {
            title: "Prose",
            body: "Sed ut perspiciatis unde omnis iste natus. Fiction, flash fiction, and creative nonfiction — accusantium doloremque.",
          },
          {
            title: "Visual Art",
            body: "Nemo enim ipsam voluptatem quia voluptas. Photography, painting, drawing, digital art — sit aspernatur aut odit.",
          },
        ].map((genre) => (
          <article className="card" key={genre.title}>
            <PlaceholderImage ratio="16 / 10" />
            <h3>{genre.title}</h3>
            <p>{genre.body}</p>
          </article>
        ))}
      </section>

      <section className="callout">
        <div>
          <span className="kicker">Join Us</span>
          <h2>Become part of the story</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit — whether
            as a contributor or a reader, there is a place for you here.
          </p>
        </div>
        <div className="callout__action">
          <Link className="btn" to="/submit">
            Submit Your Work
          </Link>
        </div>
      </section>
    </div>
  );
}
