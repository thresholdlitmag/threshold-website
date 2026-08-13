import { Link } from "react-router-dom";

export default function Shadwell() {
  return (
    <div className="page container">
      <span className="kicker">The Threshold Competition</span>
      <h1 className="page-title">Shadwell</h1>
      <p className="lede">
        Our annual writing and art competition, open to every student writer
        and artist in the school.
      </p>

      <hr className="rule-double" />

      <section className="prose prose--centered">
        <p className="dropcap">
          Shadwell is <i>Threshold</i>'s annual writing and art competition.
          Each cycle we announce a theme, and students across the school
          respond with poems, stories, and artwork — the winning entries earn
          a featured place in the magazine. Every entry is judged anonymously
          by our editorial board, so each one is read on its own merits.
        </p>
        <p>
          Shadwell entries come in through the same form as everything else we
          publish — just choose Shadwell when the form asks what you're
          submitting. This year's theme and deadline will be announced here
          soon.
        </p>
      </section>

      <section className="callout callout--center">
        <div>
          <span className="kicker">Ready?</span>
          <h2>Enter the Shadwell competition</h2>
          <p>
            Shadwell is part of our submissions — head to the Submit page to
            send in your entry.
          </p>
        </div>
        <div className="callout__action">
          <Link className="btn" to="/submit">
            Go to Submissions
          </Link>
        </div>
      </section>
    </div>
  );
}
