import PlaceholderImage from "../components/PlaceholderImage";

const HOW_TO_ENTER = [
  {
    title: "Read the Theme",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit — this edition's theme will be announced here, along with what we're looking for.",
  },
  {
    title: "Prepare Your Entry",
    body: "Sed ut perspiciatis unde omnis iste natus error. One entry per person: a poem, a piece of prose, or a work of visual art responding to the theme.",
  },
  {
    title: "Submit Before the Deadline",
    body: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur. Email your entry to shadwell@example.com with your name and category in the subject line.",
  },
  {
    title: "Judging & Results",
    body: "At vero eos et accusamus et iusto odio dignissimos. Entries are judged anonymously by the editorial board; winners are published in the next edition.",
  },
];

export default function Shadwell() {
  return (
    <div className="page container">
      <span className="kicker">The Threshold Competition</span>
      <h1 className="page-title">Shadwell</h1>
      <p className="lede">
        Lorem ipsum dolor sit amet — our magazine competition, open to all
        writers and artists.
      </p>

      <hr className="rule-double" />

      <section className="grid-2">
        <div className="prose">
          <p className="dropcap">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat — what the Shadwell
            competition is, where its name comes from, and why we run it.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>
        <aside className="sidebar">
          <div className="sidebar__box">
            <h3>Key Dates</h3>
            <ul>
              <li>
                <strong>Entries open:</strong> Lorem ipsum (placeholder date)
              </li>
              <li>
                <strong>Deadline:</strong> Dolor sit amet (placeholder date)
              </li>
              <li>
                <strong>Winners announced:</strong> Consectetur (placeholder
                date)
              </li>
              <li>
                <strong>Entry fee:</strong> Free
              </li>
            </ul>
          </div>
          <div className="sidebar__box">
            <h3>Prizes</h3>
            <ul>
              <li>
                <strong>First place:</strong> Lorem ipsum dolor — publication
                and featured spread
              </li>
              <li>
                <strong>Runners-up:</strong> Sed ut perspiciatis — publication
                in the next edition
              </li>
            </ul>
          </div>
        </aside>
      </section>

      <div className="section-head">
        <h2>How to Enter</h2>
        <span>Four steps</span>
      </div>
      <section>
        {HOW_TO_ENTER.map((step, index) => (
          <div className="guideline" key={step.title}>
            <div className="guideline__num">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="section-head">
        <h2>Past Winners</h2>
        <span>The Shadwell honor roll</span>
      </div>
      <section className="grid-3">
        {["First Place", "Second Place", "Third Place"].map((place) => (
          <article className="card" key={place}>
            <PlaceholderImage ratio="16 / 10" />
            <p className="byline" style={{ margin: "0.8rem 0 0.2rem" }}>
              {place} &middot; Previous Edition
            </p>
            <h3>Lorem Ipsum Dolor</h3>
            <p>
              Firstname Lastname — lorem ipsum dolor sit amet, consectetur
              adipiscing elit.
            </p>
          </article>
        ))}
      </section>

      <section className="callout">
        <div>
          <span className="kicker">Ready?</span>
          <h2>Enter the Shadwell competition</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit — we
            can't wait to read and see what you make.
          </p>
        </div>
        <div className="callout__action">
          <a className="btn" href="mailto:shadwell@example.com">
            Enter Now
          </a>
        </div>
      </section>
    </div>
  );
}
