import { Link, NavLink, Outlet } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/e-design", label: "E-Design" },
  { to: "/shadwell", label: "Shadwell" },
  { to: "/submit", label: "Submit" },
  { to: "/masthead", label: "Masthead" },
  { to: "/contact", label: "Contact" },
];

function todayLine(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Layout() {
  return (
    <>
      <header>
        <div className="container">
          <div className="topbar">
            <span>{todayLine()}</span>
            <span>Vol. I &middot; Est. MMXXVI</span>
            <span>Poetry &middot; Prose &middot; Visual Art</span>
          </div>
          <div className="masthead">
            <h1 className="masthead__title">
              <Link to="/">Threshold</Link>
            </h1>
            <p className="masthead__tagline">
              A Literary &amp; Arts Magazine — where every ending is a doorway
            </p>
            <div className="masthead__ornament" aria-hidden="true">
              ❦
            </div>
          </div>
        </div>
        <nav className="nav" aria-label="Primary">
          <div className="container">
            <ul className="nav__list">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `nav__link ${isActive ? "nav__link--active" : ""}`
                    }
                    end={item.to === "/"}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer__inner">
            <div>
              <div className="footer__brand">Threshold</div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit — a
                magazine of poetry, prose, and visual art.
              </p>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                {NAV_ITEMS.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Connect</h4>
              <ul>
                <li>
                  <a href="mailto:hello@example.com">Email</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Instagram
                  </a>
                </li>
                <li>
                  <Link to="/submit">Submission Guidelines</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer__bottom">
            <span>
              &copy; {new Date().getFullYear()} Threshold Literary &amp; Arts
              Magazine
            </span>
            <span>All work belongs to its creators</span>
          </div>
        </div>
      </footer>
    </>
  );
}
