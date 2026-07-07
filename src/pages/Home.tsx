import { Link } from "react-router-dom";
import PlaceholderImage from "../components/PlaceholderImage";

const LOREM_SHORT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio praesent libero.";

const FEATURED = [
  { title: "Lorem Ipsum Dolor", author: "Firstname Lastname", genre: "Poetry" },
  { title: "Sed Ut Perspiciatis", author: "Firstname Lastname", genre: "Fiction" },
  { title: "Nemo Enim Ipsam", author: "Firstname Lastname", genre: "Essay" },
];

const IN_THIS_ISSUE = [
  { title: "At Vero Eos et Accusamus", genre: "Poetry" },
  { title: "Temporibus Autem Quibusdam", genre: "Short Story" },
  { title: "Itaque Earum Rerum", genre: "Visual Art" },
  { title: "Nam Libero Tempore", genre: "Creative Nonfiction" },
];

export default function Home() {
  return (
    <div className="page container">
      {/* -------- featured story hero -------- */}
      <section className="hero">
        <article>
          <span className="kicker">Featured &middot; From the Latest Issue</span>
          <h2 className="hero__headline">
            <Link to="/gallery">
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit
            </Link>
          </h2>
          <p className="byline">By Firstname Lastname &middot; Poetry</p>
          <div className="two-col prose">
            <p className="dropcap">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. Sed ut perspiciatis
              unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
              veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt, neque porro quisquam est.
            </p>
          </div>
        </article>

        <aside className="sidebar">
          <PlaceholderImage
            ratio="4 / 5"
            framed
            caption="Featured artwork — title, artist, medium"
          />
          <div className="sidebar__box">
            <h3>In This Issue</h3>
            <ul>
              {IN_THIS_ISSUE.map((piece) => (
                <li key={piece.title}>
                  <Link to="/gallery">{piece.title}</Link>
                  <em>{piece.genre}</em>
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
            Lorem ipsum dolor sit amet, consectetur
          </h2>
          <div className="prose">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Bibendum est ultricies integer quis auctor elit sed vulputate mi
              sit. Amet consectetur adipiscing elit duis tristique sollicitudin
              nibh sit amet.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum.
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            id ligula porta felis euismod semper — we read every submission
            with care.
          </p>
        </div>
        <div className="callout__action">
          <Link className="btn" to="/submit">
            Submit Your Work
          </Link>
        </div>
      </section>

      {/* -------- recent highlights -------- */}
      <div className="section-head">
        <h2>Recent Highlights</h2>
        <span>Selected by the editors</span>
      </div>
      <section className="grid-3">
        {FEATURED.map((piece) => (
          <article className="card" key={piece.title}>
            <PlaceholderImage ratio="16 / 10" />
            <h3>
              <Link to="/gallery">{piece.title}</Link>
            </h3>
            <p className="byline" style={{ marginBottom: "0.4rem" }}>
              {piece.author} &middot; {piece.genre}
            </p>
            <p>{LOREM_SHORT}</p>
          </article>
        ))}
      </section>

      {/* -------- pull quote -------- */}
      <blockquote className="pullquote">
        “Lorem ipsum dolor sit amet, consectetur adipiscing elit — sed do
        eiusmod tempor incididunt ut labore et dolore.”
        <cite>— Firstname Lastname, Editor-in-Chief</cite>
      </blockquote>
    </div>
  );
}
