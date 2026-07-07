import { Link } from "react-router-dom";
import PlaceholderImage from "../components/PlaceholderImage";

export default function About() {
  return (
    <div className="page container">
      <span className="kicker">About the Magazine</span>
      <h1 className="page-title">Our Story</h1>
      <p className="lede">
        A student-run literary and arts magazine, publishing poetry, prose,
        art, and music since 1986.
      </p>

      <hr className="rule-double" />

      <section className="grid-2">
        <div className="prose">
          <p className="dropcap">
            <i>Threshold</i> is a forum for student work. This magazine was
            founded on the premise that all fields hold opportunities for
            creative expression, and that we can find the essential human
            creation in everything we create.
          </p>
          <p>
            Since 1986, our student editors have gathered poetry, prose,
            visual art, and music from across the school and shaped them into
            a new edition each year — thirty-nine volumes and counting.
          </p>
          <p>
            A threshold is not a wall; it is an invitation to step through.
            Every piece we publish is a doorway into someone else's way of
            seeing, and we hope you'll linger in each one.
          </p>
        </div>
        <PlaceholderImage
          ratio="4 / 5"
          framed
          caption="Photo — the founding editors"
        />
      </section>

      <blockquote className="pullquote">
        “It’s not so much the contents of the song. It’s that the song was still being sung.”
        <cite>— Anthony Doerr, <i>Cloud Cuckoo Land</i></cite>
      </blockquote>

      <div className="section-head">
        <h2>What We Publish</h2>
        <span>Genres &amp; forms</span>
      </div>
      <section className="grid-3">
        {[
          {
            title: "Poetry",
            body: "Free verse, formal verse, prose poems — if it sings, we want to read it.",
          },
          {
            title: "Prose",
            body: "Fiction, flash fiction, and creative nonfiction, from a single page to a full story.",
          },
          {
            title: "Visual Art",
            body: "Photography, painting, drawing, and digital art from student artists in every medium.",
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
            Whether as a contributor, an editor, or a reader, there is a
            place for you here.
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
