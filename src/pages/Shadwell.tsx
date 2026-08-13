import { Link } from "react-router-dom";

export default function Shadwell() {
  return (
    <div className="page container">
      <span className="kicker">The Threshold Competition</span>
      <h1 className="page-title">Shadwell</h1>
      <p className="lede">
        Annual writing competition, judged by outside judges. 
      </p>

      <hr className="rule-double" />

      <section className="prose prose--centered">
        <p className="dropcap">
          Shadwell is <i>Threshold</i>'s annual writing and arts competition.
          Historically, Shadwell has only covered writing, but this year we are expanding
          to also include art! Each year, Shadwell has a theme, which submissions 
          should align with. 
        </p>
        <p>
          You can submit entries to Shadwell the same way they would be submitted 
          to <i>Threshold</i> - through the submission form. Shadwell is judged by 
          outisde judges, generally published authors. Winning entries are included 
          in <i>Threshold</i>, and winners also receive a pie! This year's theme will
          be announced soon. 
        </p>
      </section>

      {/* Text left, button right — the same two-column call-out the Home
          page uses for submissions. */}
      <section className="callout">
        <div>
          <span className="kicker">Ready?</span>
          <h2>Enter the Shadwell competition</h2>
          <p>
            Head to the submissions page to submit your work for Shadwell.
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
