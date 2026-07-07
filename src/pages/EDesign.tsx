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
    title: "Getting Started — Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Creating your account and finding your way around the platform.",
    duration: "5 min",
  },
  {
    title: "Setting Up Your First Project",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem — starting a new design from a blank page or a template.",
    duration: "8 min",
  },
  {
    title: "Working With Text & Type",
    description:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur — fonts, sizing, and laying out text like a magazine spread.",
    duration: "6 min",
  },
  {
    title: "Adding & Editing Images",
    description:
      "At vero eos et accusamus et iusto odio dignissimos — uploading artwork, cropping, and placing images on the page.",
    duration: "7 min",
  },
  {
    title: "Collaborating With the Team",
    description:
      "Temporibus autem quibusdam et aut officiis debitis — sharing your work, leaving comments, and editing together.",
    duration: "4 min",
  },
  {
    title: "Exporting & Publishing",
    description:
      "Itaque earum rerum hic tenetur a sapiente delectus — turning your finished design into a print-ready or web-ready file.",
    duration: "5 min",
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
        Lorem ipsum dolor sit amet — step-by-step video tutorials on using
        our online design platform.
      </p>

      <hr className="rule-double" />

      <div className="section-head">
        <h2>Tutorials</h2>
        <span>Watch in order, or jump to what you need</span>
      </div>
      <section className="grid-3">
        {TUTORIALS.map((tutorial) => (
          <VideoCard key={tutorial.title} tutorial={tutorial} />
        ))}
      </section>

      <blockquote className="pullquote">
        “Ut labore et dolore magnam aliquam quaerat voluptatem — design is
        thinking made visible.”
        <cite>— A note from the design team (placeholder)</cite>
      </blockquote>
    </div>
  );
}
