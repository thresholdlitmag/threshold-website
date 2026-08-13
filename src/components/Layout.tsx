import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import BackToTop from "./BackToTop";
import FlowerEffects from "./FlowerEffects";
import QuickNav from "./QuickNav";
import ScrollProgress from "./ScrollProgress";
import ScrollReveal from "./ScrollReveal";
import ScrollToTop from "./ScrollToTop";
import { NAV_ITEMS } from "../data/nav";
import useStuck from "../hooks/useStuck";

/** The wordmark, one letter per element, for the entrance animation. */
const WORDMARK = "Threshold".split("");

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
  const [navSentinelRef, navStuck] = useStuck();

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
      <ScrollProgress />

      {/* First thing in the tab order: a way past the whole masthead and
          nav for anyone reading with a keyboard or a screen reader. */}
      <a className="skip-link" href="#main">
        Skip to content
      </a>

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
              {/*
                The wordmark is split into letters so each one can rise
                into place a beat after the last. The <span>s are marked
                aria-hidden and the readable name is carried on the link
                itself, so assistive tech hears "Threshold" rather than
                nine separate letters.
              */}
              <Link to="/" aria-label="Threshold — home">
                {WORDMARK.map((letter, i) => (
                  <span
                    key={i}
                    className="masthead__letter"
                    aria-hidden="true"
                    style={{ ["--letter-i" as string]: i }}
                  >
                    {letter}
                  </span>
                ))}
              </Link>
            </h1>
            <p className="masthead__tagline">
              A Literary &amp; Arts Magazine
            </p>
            <div className="masthead__ornament" aria-hidden="true">
              ❦
            </div>
          </div>
        </div>
      </header>

      {/*
        The nav is a sibling of <header>, not a child of it.

        A sticky element can only travel inside its own parent, so while
        this bar lived at the bottom of the header its sticky range was
        zero pixels and it scrolled away like anything else. Out here its
        containing block is the page, so it pins to the top and stays for
        the whole scroll. The sentinel just above it is what tells us the
        moment that happens, so the bar can condense once it does.
      */}
      <div ref={navSentinelRef} aria-hidden="true" />
      <nav
        className={`nav ${navStuck ? "nav--stuck" : ""}`}
        aria-label="Primary"
      >
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
      <main key={location.pathname} id="main" className="page-enter" tabIndex={-1}>
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
