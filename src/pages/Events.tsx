const INSTAGRAM_URL = "https://www.instagram.com/threshlitmag";
const FACEBOOK_URL =
  "https://www.facebook.com/p/Threshold-Literary-and-Arts-Magazine-100049047613023/";

const CALENDAR_SRC =
  "https://calendar.google.com/calendar/embed?src=41f09267de31f79d455a997609212aacde8c7a09cb9b3bdb2d1434a04769f0fc%40group.calendar.google.com&ctz=America%2FNew_York";

/**
 * Recent Instagram posts to feature. Paste the link to any post
 * (e.g. "https://www.instagram.com/p/ABC123xyz/") and it appears
 * below — keep the 2–4 most recent and delete old ones.
 */
const INSTAGRAM_POSTS: string[] = [
  "https://www.instagram.com/p/DaA5R7rlcur", 
];

/** Turn a regular Instagram post link into its embeddable form. */
function instagramEmbedSrc(postUrl: string): string {
  return postUrl.replace(/\/?$/, "/") + "embed/";
}

export default function Events() {
  return (
    <div className="page container">
      <span className="kicker">Mark Your Calendars</span>
      <h1 className="page-title">Events</h1>
      <p className="lede">
        Meetings, deadlines, and everything happening at Threshold.
      </p>

      <hr className="rule-double" />

      <div className="embed-frame embed-frame--calendar">
        <iframe
          src={CALENDAR_SRC}
          title="Threshold events calendar"
          scrolling="no"
        />
      </div>

      <div className="section-head">
        <h2>Follow Threshold</h2>
        <span>@threshlitmag</span>
      </div>
      <section className="grid-2">
        <div>
          <p className="byline" style={{ marginBottom: "0.8rem" }}>
            Latest from Facebook
          </p>
          <div className="embed-frame embed-frame--social">
            <iframe
              src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
                FACEBOOK_URL,
              )}&tabs=timeline&width=500&height=600&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`}
              title="Threshold on Facebook"
              scrolling="no"
              allow="encrypted-media"
            />
          </div>
          <p style={{ marginTop: "1rem" }}>
            <a
              className="btn btn--ghost"
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
            >
              Visit Our Facebook
            </a>
          </p>
        </div>
        <div>
          <p className="byline" style={{ marginBottom: "0.8rem" }}>
            Latest from Instagram
          </p>
          {INSTAGRAM_POSTS.length > 0 ? (
            INSTAGRAM_POSTS.map((post) => (
              <div className="embed-frame embed-frame--social" key={post}>
                <iframe
                  src={instagramEmbedSrc(post)}
                  title="Threshold on Instagram"
                  scrolling="no"
                  allow="encrypted-media"
                />
              </div>
            ))
          ) : (
            <div className="sidebar__box">
              <h3>@threshlitmag</h3>
              <p>
                Follow us on Instagram for announcements, featured work, and
                behind-the-scenes looks at the making of the magazine.
              </p>
            </div>
          )}
          <p style={{ marginTop: "1rem" }}>
            <a
              className="btn btn--ghost"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
            >
              Visit Our Instagram
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
