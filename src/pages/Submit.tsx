import FormButton from "../components/FormButton";
import WorkVisual from "../components/WorkVisual";
import { CONTACT_EMAIL } from "../data/site";
import { getWork } from "../data/works";

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
    body: "Free verse, formal verse, prose poems — if it sings, we want to read it.",
    sampleId: "w11",
  },
  {
    title: "Prose",
    body: "Fiction, flash fiction, and creative nonfiction, from a single page to a full story.",
    sampleId: "w12",
  },
  {
    title: "Visual Art",
    body: "Photography, painting, drawing, and digital art from student artists in every medium.",
    sampleId: "w3",
  },
  {
    title: "Music",
    body: "Original composition and songwriting — send us the score or a recording, and we'll publish it alongside the writing and art.",
  },
];

const GUIDELINES = [
  {
    title: "How Much to Send",
    body: "Up to 5 poems, prose to 3,000 words, or up to 5 pieces of visual art per submission. Music and other creative work are welcome too.",
  },
  {
    title: "How to Format It",
    body: "Send documents as .docx or .pdf, and images as high-resolution .jpg or .png files. Put your name in the file name so nothing gets lost.",
  },
  {
    title: "What Happens Next",
    body: "Our editors read every piece anonymously and respond within a few weeks. Accepted work appears in the next volume of Threshold.",
  },
];

export default function Submit() {
  return (
    <div className="page container">
      <span className="kicker">Submissions</span>
      <h1 className="page-title">Submit Your Work</h1>
      <p className="lede">
        Poetry, prose, visual art, or music — whatever you have been making,
        we would love to read it, look at it, and listen to it.
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
                        .map((line, i) => <p key={i}>{line}</p>)}
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

      <section className="callout callout--center">
        <div>
          <span className="kicker">Ready When You Are</span>
          <h2>Send us your work</h2>
          <p>
            Submissions go through our Google Form — it takes a couple of
            minutes, it's free, and it always will be. Questions? Write to{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </div>
        <div className="callout__action">
          <FormButton>Open the Submission Form</FormButton>
        </div>
      </section>

      <blockquote className="pullquote">
        “What would you write if you weren't afraid?”
        <cite>— Mary Karr</cite>
      </blockquote>
    </div>
  );
}
