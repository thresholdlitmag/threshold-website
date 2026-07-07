import PlaceholderImage from "../components/PlaceholderImage";

const GUIDELINES = [
  {
    title: "What to Send",
    body: "Up to 5 poems, prose to 3,000 words, or up to 5 pieces of visual art per submission. Music and other creative work are welcome too.",
  },
  {
    title: "How to Format",
    body: "Please send documents as .docx or .pdf and images as high-resolution .jpg or .png files.",
  },
  {
    title: "Where to Send It",
    body: "Email your work to thresholdlitmag@gmail.com with your name and genre in the subject line.",
  },
  {
    title: "What Happens Next",
    body: "Our editors read every piece anonymously and respond within a few weeks. Accepted work appears in the next edition of Threshold.",
  },
];

export default function Submit() {
  return (
    <div className="page container">
      <span className="kicker">Submissions</span>
      <h1 className="page-title">Submit Your Work</h1>
      <p className="lede">
        Poetry, prose, art, or music — we want to see what you have made.
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
                <strong>Opens:</strong> To be announced
              </li>
              <li>
                <strong>Closes:</strong> To be announced
              </li>
              <li>
                <strong>Response time:</strong> A few weeks
              </li>
              <li>
                <strong>Fee:</strong> Free, always
              </li>
            </ul>
          </div>
          <a className="btn" href="mailto:thresholdlitmag@gmail.com">
            Email Your Submission
          </a>
        </aside>
      </section>

      <blockquote className="pullquote">
        “What would you write if you weren't afraid?”
        <cite>— Mary Karr</cite>
      </blockquote>
    </div>
  );
}
