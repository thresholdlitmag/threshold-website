import PlaceholderImage from "../components/PlaceholderImage";

const GUIDELINES = [
  {
    title: "What to Send",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit — up to 5 poems, prose to 3,000 words, or up to 5 pieces of visual art per submission.",
  },
  {
    title: "How to Format",
    body: "Sed ut perspiciatis unde omnis iste natus error. Please send documents as .docx or .pdf and images as high-resolution .jpg or .png files.",
  },
  {
    title: "Where to Send It",
    body: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur. Email your work to submissions@example.com with your name and genre in the subject line.",
  },
  {
    title: "What Happens Next",
    body: "At vero eos et accusamus et iusto odio dignissimos. Our editors read every piece and respond within 4–6 weeks. Simultaneous submissions welcome.",
  },
];

export default function Submit() {
  return (
    <div className="page container">
      <span className="kicker">Submissions</span>
      <h1 className="page-title">Submit Your Work</h1>
      <p className="lede">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit — we want to
        read what you have made.
      </p>

      <hr className="rule-double" />

      <section className="grid-2">
        <div>
          {GUIDELINES.map((guide, index) => (
            <div className="guideline" key={guide.title}>
              <div className="guideline__num">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <h3>{guide.title}</h3>
                <p>{guide.body}</p>
              </div>
            </div>
          ))}
        </div>

        <aside className="sidebar">
          <PlaceholderImage
            ratio="4 / 5"
            framed
            caption="Artwork — submissions open"
          />
          <div className="sidebar__box">
            <h3>Reading Period</h3>
            <ul>
              <li>
                <strong>Opens:</strong> Lorem ipsum (placeholder date)
              </li>
              <li>
                <strong>Closes:</strong> Dolor sit amet (placeholder date)
              </li>
              <li>
                <strong>Response time:</strong> 4–6 weeks
              </li>
              <li>
                <strong>Fee:</strong> Free, always
              </li>
            </ul>
          </div>
          <a className="btn" href="mailto:submissions@example.com">
            Email Your Submission
          </a>
        </aside>
      </section>

      <blockquote className="pullquote">
        “Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
        suscipit laboriosam.”
        <cite>— A note from the editors (placeholder)</cite>
      </blockquote>
    </div>
  );
}
