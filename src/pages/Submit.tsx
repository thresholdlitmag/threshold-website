import FormButton from "../components/FormButton";
import WorkVisual from "../components/WorkVisual";
import { CONTACT_EMAIL } from "../data/site";
import { getWork } from "../data/works";
import Formatted from "../lib/textFormat";

/**
 * What we publish. Each genre can point at a real published piece
 * (by its id in data/works.ts) to show as a sample — swap the id to
 * feature a different piece, or drop `sampleId` to show none.
 */
const GENRES: {
  title: string;
  body: string;
  sampleId?: string;
}[] = [
  {
    title: "Poetry",
    body: "All types of poetry are welcome.",
    sampleId: "w11",
  },
  {
    title: "Prose",
    body: "Prose includes writing that isn't poetry.",
    sampleId: "w12",
  },
  {
    title: "Visual Art",
    body: "All types of artwork.",
    sampleId: "w3",
  },
  {
    title: "Music",
    body: "Feel free to send in a music score!",
  },
];

const GUIDELINES = [
  {
    title: "Formatting",
    body: "It really doesn't matter, just watch the length for prose pieces.",
  },
  {
    title: "Review",
    body: "We review pieces at our weekly meetings. Feel free to pull up!",
  },
  {
    title: "Timeline",
    body: "We'll get back to you sometime around January (hopefully)."
  },
];

export default function Submit() {
  return (
    <div className="page container">
      <span className="kicker">Submissions</span>
      <h1 className="page-title">Submit Your Work</h1>
      <p className="lede">
        We take submission for poetry, prose, art, and music if you have it. 
      </p>

      <hr className="rule-double" />

      <div className="section-head">
        <h2>What to Submit</h2>
        <span>Four ways in</span>
      </div>
      <section className="grid-auto">
        {GENRES.map((genre) => {
          const sample = genre.sampleId ? getWork(genre.sampleId) : undefined;
          return (
            <article className="card genre-card" key={genre.title}>
              {sample && (
                <div className="genre-card__sample">
                  {sample.imageUrl ? (
                    <WorkVisual work={sample} />
                  ) : (
                    <blockquote className="work__text">
                      {sample.excerpt
                        ?.split(" / ")
                        .slice(0, 4)
                        .map((line, i) => (
                          <p key={i}>
                            <Formatted text={line} />
                          </p>
                        ))}
                    </blockquote>
                  )}
                  <p className="genre-card__credit">
                    {sample.title} &middot; {sample.author}
                  </p>
                </div>
              )}
              <h3>{genre.title}</h3>
              <p>{genre.body}</p>
            </article>
          );
        })}
      </section>

      <div className="section-head">
        <h2>Before You Send</h2>
        <span>A few practical notes</span>
      </div>
      <section className="guidelines">
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
      </section>

      {/* The same two-column call-out the Home and Shadwell pages use —
          text on the left, button on the right. */}
      <section className="callout">
        <div>
          <span className="kicker">Submit here!</span>
          <h2>Send us your work</h2>
          <p>
            Submissions go through our Google Form. Questions? Write to{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </div>
        <div className="callout__action">
          <FormButton>Submission Form</FormButton>
        </div>
      </section>

      <blockquote className="pullquote">
        “What would you write if you weren't afraid?”
        <cite>— Mary Karr</cite>
      </blockquote>
    </div>
  );
}
