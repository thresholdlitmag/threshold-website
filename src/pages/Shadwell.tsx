import PlaceholderImage from "../components/PlaceholderImage";

const HOW_TO_ENTER = [
  {
    title: "Read the Theme",
    body: "This edition's theme will be announced here, along with what the judges are looking for.",
  },
  {
    title: "Prepare Your Entry",
    body: "One entry per person: a poem, a piece of prose, or a work of visual art responding to the theme.",
  },
  {
    title: "Submit Before the Deadline",
    body: "Email your entry to thresholdlitmag@gmail.com with your name and category in the subject line.",
  },
  {
    title: "Judging & Results",
    body: "Entries are judged anonymously by the editorial board; winners are published in the next edition of Threshold.",
  },
];

export default function Shadwell() {
  return (
    <div className="page container">
      <span className="kicker">The Threshold Competition</span>
      <h1 className="page-title">Shadwell</h1>
      <p className="lede">
        Our magazine competition, open to all student writers and artists.
      </p>

      <hr className="rule-double" />

      <section className="grid-2">
        <div className="prose">
          <p className="dropcap">
            Shadwell is <i>Threshold</i>'s annual writing and art
            competition. Each cycle we announce a theme, and students across
            the school respond with poems, stories, and artwork — the
            winning entries earn a featured place in the magazine.
          </p>
          <p>
            The competition is judged anonymously by our editorial board, so
            every entry is read on its own merits. The story of the
            competition's name, and this year's theme, will be announced
            here soon.
          </p>
        </div>
        <aside className="sidebar">
          <div className="sidebar__box">
            <h3>Key Dates</h3>
            <ul>
              <li>
                <strong>Entries open:</strong> To be announced
              </li>
              <li>
                <strong>Deadline:</strong> To be announced
              </li>
              <li>
                <strong>Winners announced:</strong> To be announced
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
                <strong>First place:</strong> Publication with a featured
                spread in the next edition
              </li>
              <li>
                <strong>Runners-up:</strong> Publication in the next edition
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
            <h3>To Be Announced</h3>
            <p>
              Winning entries from past competitions will be showcased here.
            </p>
          </article>
        ))}
      </section>

      <section className="callout">
        <div>
          <span className="kicker">Ready?</span>
          <h2>Enter the Shadwell competition</h2>
          <p>
            We can't wait to read and see what you make.
          </p>
        </div>
        <div className="callout__action">
          <a className="btn" href="mailto:thresholdlitmag@gmail.com">
            Enter Now
          </a>
        </div>
      </section>
    </div>
  );
}
