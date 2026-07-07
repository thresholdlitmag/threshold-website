import PlaceholderImage from "../components/PlaceholderImage";

const ISSUES = [
  {
    title: "Issue I — Lorem Ipsum",
    season: "Spring 2026",
    blurb:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
  {
    title: "Issue II — Dolor Sit Amet",
    season: "Coming Soon",
    blurb:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    title: "Issue III — Consectetur",
    season: "Coming Soon",
    blurb:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
  },
];

export default function Issues() {
  return (
    <div className="page container">
      <span className="kicker">The Archive</span>
      <h1 className="page-title">Issues</h1>
      <p className="lede">
        Lorem ipsum dolor sit amet — every issue of Threshold, collected in
        one place.
      </p>

      <hr className="rule-double" />

      <section className="grid-3">
        {ISSUES.map((issue) => (
          <article className="card issue-card" key={issue.title}>
            <PlaceholderImage ratio="3 / 4" framed />
            <p className="meta">{issue.season}</p>
            <h3>
              <a href="#" onClick={(e) => e.preventDefault()}>
                {issue.title}
              </a>
            </h3>
            <p>{issue.blurb}</p>
          </article>
        ))}
      </section>

      <div className="section-head">
        <h2>From the Pages</h2>
        <span>Selected excerpts</span>
      </div>
      <section className="grid-2">
        <article>
          <p className="byline">Poetry &middot; Firstname Lastname</p>
          <div className="prose">
            <p className="dropcap">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus
              mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
              quis, sem.
            </p>
            <p>
              Nulla consequat massa quis enim. Donec pede justo, fringilla
              vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus
              ut, imperdiet a, venenatis vitae, justo.
            </p>
          </div>
        </article>
        <article>
          <p className="byline">Fiction &middot; Firstname Lastname</p>
          <div className="prose">
            <p className="dropcap">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae
              vitae dicta sunt explicabo.
            </p>
            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint.
            </p>
          </div>
        </article>
      </section>

      <blockquote className="pullquote">
        “Itaque earum rerum hic tenetur a sapiente delectus, ut aut
        reiciendis voluptatibus maiores alias consequatur.”
        <cite>— From Issue I (placeholder)</cite>
      </blockquote>
    </div>
  );
}
