/**
 * E-Design — tutorial videos for the online platform.
 *
 * To publish a real tutorial, add its YouTube video ID to the entry
 * (the part after "watch?v=" in the URL). Entries without an ID show
 * a placeholder card until the video is ready.
 */

interface Tutorial {
  title: string;
  description: string;
  duration: string;
  youtubeId?: string;
}

const TUTORIALS: Tutorial[] = [
  {
    title: "Intro to E-Design",
    description:
      "How to navigate around E-Design, and basic features.",
    duration: "5 min",
  },
  {
    title: "Formatting text",
    description:
      "How to change fonts and align text.",
    duration: "2 min",
  },
  {
    title: "Prose Pieces",
    description:
      "How to format prose into columns and other tips.",
    duration: "2 min",
  },
  {
    title: "Importing images",
    description:
      "Best practices for uploading artwork from Canva or Adobe.",
    duration: "2 min",
  },
];

function VideoCard({ tutorial }: { tutorial: Tutorial }) {
  return (
    <article className="card video-card">
      {tutorial.youtubeId ? (
        <div className="video-embed">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${tutorial.youtubeId}`}
            title={tutorial.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="video-placeholder" aria-label="Video coming soon">
          <span className="video-placeholder__play" aria-hidden="true" />
          <span className="video-placeholder__label">Video coming soon</span>
        </div>
      )}
      <p className="byline" style={{ margin: "0.8rem 0 0.2rem" }}>
        Tutorial &middot; {tutorial.duration}
      </p>
      <h3>{tutorial.title}</h3>
      <p>{tutorial.description}</p>
    </article>
  );
}

export default function EDesign() {
  return (
    <div className="page container">
      <span className="kicker">Learn the Platform</span>
      <h1 className="page-title">E-Design</h1>
      <p className="lede">
        Video tutorials to help you use E-Deisgn for spread design. 
      </p>

      <hr className="rule-double" />

      <div className="section-head">
        <h2>Tutorials</h2>
      </div>
      <section className="grid-3">
        {TUTORIALS.map((tutorial) => (
          <VideoCard key={tutorial.title} tutorial={tutorial} />
        ))}
      </section>

      <blockquote className="pullquote">
        “I hate Congress—I hate the army—I hate the world—I hate myself. The whole is a mass of fools and knaves; I could almost except you and Meade.”
        <cite>— Alexander Hamilton</cite>
      </blockquote>
    </div>
  );
}
