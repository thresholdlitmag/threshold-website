import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { NAV_ITEMS } from "../data/nav";
import useScrolledPast from "../hooks/useScrolledPast";

/**
 * Floating quick-nav.
 *
 * The main nav bar scrolls away with the header, which meant going to
 * another page from halfway down meant scrolling all the way back up.
 * This fades in at the top right once the header is out of view and
 * opens a short menu of every page.
 */
export default function QuickNav() {
  const [open, setOpen] = useState(false);
  const visible = useScrolledPast(320);
  const location = useLocation();
  const rootRef = useRef<HTMLDivElement>(null);

  // Close on navigation.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Close when it scrolls out of view again.
  useEffect(() => {
    if (!visible) setOpen(false);
  }, [visible]);

  // Close on a click outside the menu, or on Escape.
  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      className={`quicknav ${visible ? "quicknav--visible" : ""}`}
      ref={rootRef}
      // Keep it out of the tab order entirely while it's hidden.
      aria-hidden={!visible}
    >
      <button
        className="quicknav__button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Jump to another page"
        tabIndex={visible ? 0 : -1}
        onClick={() => setOpen((wasOpen) => !wasOpen)}
      >
        <span className="quicknav__ornament" aria-hidden="true">
          ❦
        </span>
        <span className="quicknav__label">Menu</span>
      </button>

      {open && (
        <ul className="quicknav__list">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `quicknav__link ${isActive ? "quicknav__link--active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
