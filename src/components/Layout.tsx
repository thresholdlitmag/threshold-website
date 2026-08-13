import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import BackToTop from "./BackToTop";
import FlowerEffects from "./FlowerEffects";
import PressedBackdrop from "./PressedBackdrop";
import QuickNav from "./QuickNav";
import ScrollReveal from "./ScrollReveal";
import ScrollToTop from "./ScrollToTop";
import { NAV_ITEMS } from "../data/nav";

function todayLine(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close the drawer on navigation and keep the page from scrolling
  // behind it while it's open.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <ScrollToTop />
      <ScrollReveal />
      <PressedBackdrop />
      <header>
        <div className="container">
          <div className="topbar">
            <span className="topbar__date">{todayLine()}</span>
            <span className="topbar__vol">Vol.&nbsp;XXXIX</span>
            <span className="topbar__est">Est.&nbsp;1986</span>
            <span className="topbar__genres">
              Poetry &middot; Prose &middot; Art &middot; Music
            </span>
          </div>

          {/*
            The menu button sits above the Threshold wordmark on phones,
            where the horizontal nav row is hidden. On desktop this row
            is hidden and the nav bar below the masthead takes over.
          */}
          <div className="mobilebar">
            <button
              className="nav__toggle"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <span />
              <span />
              <span />
            </button>
            <span className="mobilebar__label" aria-hidden="true">
              Menu
            </span>
          </div>

          <div className="masthead">
            <h1 className="masthead__title">
              <Link to="/">Threshold</Link>
            </h1>
            <p className="masthead__tagline">
              A Literary &amp; Arts Magazine
            </p>
            <div className="masthead__ornament" aria-hidden="true">
              ❦
            </div>
          </div>
        </div>
        <nav className="nav" aria-label="Primary">
          <div className="container nav__bar">
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

      {menuOpen && (
        <div
          className="nav-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        className={`drawer ${menuOpen ? "drawer--open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="drawer__head">
          <span className="drawer__brand">Threshold</span>
          <button
            className="drawer__close"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            &times;
          </button>
        </div>
        <ul className="drawer__list">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `drawer__link ${isActive ? "drawer__link--active" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      <QuickNav />

      {/* Keyed on the path so each page replays the settle-in animation. */}
      <main key={location.pathname} className="page-enter">
        <Outlet />
      </main>

      <BackToTop />
      <FlowerEffects />

      <footer className="footer">
        <div className="container">
          <div className="footer__inner">
            <div>
              <div className="footer__brand">Threshold</div>
              <p>
                <i>Threshold</i> is a forum for student work. This magazine was founded on the premise that all fields hold opportunities for creative expression
                and that we can find the essential human creation in everything we create.
              </p>
            </div>
            <div>
              <h4 className="footer__connect-head">Connect</h4>
              <ul>
                <li>
                  <a href="mailto:thresholdlitmag@gmail.com">Email</a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/threshlitmag"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/p/Threshold-Literary-and-Arts-Magazine-100049047613023/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <Link to="/submit">Submit Your Work</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer__bottom">
            <span>
              &copy; {new Date().getFullYear()} Threshold Literary &amp; Arts
              Magazine
            </span>
            <span>
              All work published here remains the property of its author or
              artist. Please don't repost without permission.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
