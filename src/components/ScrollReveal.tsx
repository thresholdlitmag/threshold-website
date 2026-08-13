import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Settles content onto the page as it scrolls into view.
 *
 * Rather than wrapping every section on every page in a component, this
 * picks elements out of the DOM by selector after each navigation. Add a
 * new page and it inherits the behaviour for free.
 *
 * The hidden state is applied in a layout effect — before the browser
 * paints — so nothing flashes into view and then hides itself again.
 */

/*
  Down to the paragraph, so the writing arrives as you reach it rather
  than sitting there waiting. Prose and poetry are targeted by their
  child paragraphs — not the `.prose` wrapper — so a long piece comes in
  stanza by stanza instead of all in one block.
*/
const TARGETS = [
  ".kicker",
  ".page-title",
  ".lede",
  ".hero__headline",
  ".byline",
  ".section-head",
  ".card",
  ".work",
  ".callout",
  ".pullquote",
  ".guideline",
  ".member",
  ".sidebar__box",
  ".embed-frame",
  ".figure",
  ".rights-notice",
  ".prose > p",
  ".poem > p",
  ".form label",
].join(", ");

const REVEALED = "reveal--in";
const PENDING = "reveal";
/**
 * Left on for good once an element has arrived.
 *
 * `reveal--in` is stripped after the animation lands (see below), so it
 * can't be used to style the settled state. Anything that should stay
 * changed once a piece is on screen — the marker stroke under a section
 * head, the quote mark behind a pull quote — hangs off this instead.
 */
const DONE = "is-revealed";
/** Must outlast the reveal animation plus its longest stagger delay. */
const SETTLE_MS = 1100;

/**
 * Fire this on `window` after swapping the contents of the page without
 * navigating — filtering the gallery, say — and the new elements get the
 * same treatment as a fresh page.
 */
export const REVEAL_REFRESH_EVENT = "threshold:reveal-refresh";

export default function ScrollReveal() {
  const { pathname } = useLocation();
  // Bumped by the refresh event to re-run the effect below.
  const [signal, setSignal] = useState(0);

  useEffect(() => {
    const bump = () => setSignal((n) => n + 1);
    window.addEventListener(REVEAL_REFRESH_EVENT, bump);
    return () => window.removeEventListener(REVEAL_REFRESH_EVENT, bump);
  }, []);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(TARGETS),
    );
    if (elements.length === 0) return;

    elements.forEach((el) => {
      // Anything already settled — a section the reader has scrolled
      // past before the gallery was re-filtered — is left alone rather
      // than being faded out and brought back in.
      if (el.classList.contains(DONE)) return;
      el.classList.add(PENDING);
      // A short stagger by position among siblings, so a row of cards
      // arrives one after another instead of all at once.
      const index = el.parentElement
        ? Array.prototype.indexOf.call(el.parentElement.children, el)
        : 0;
      el.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 70}ms`);
    });

    const timers: number[] = [];

    function reveal(el: Element) {
      el.classList.add(REVEALED, DONE);
      // Drop the two animation classes once it has landed. Leaving the
      // animation in place with fill-mode: both would pin the element's
      // transform and stop :hover from ever moving it again. DONE stays
      // on — it carries no transform, only settled-state styling.
      timers.push(
        window.setTimeout(
          () => el.classList.remove(PENDING, REVEALED),
          SETTLE_MS,
        ),
      );
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          // Once it has arrived it stays — re-animating on the way back
          // up is the sort of thing that makes a page feel restless.
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );

    elements.forEach((el) => observer.observe(el));

    // Anything already on screen at load shouldn't wait for a scroll.
    const settle = window.requestAnimationFrame(() => {
      elements.forEach((el) => {
        const box = el.getBoundingClientRect();
        if (box.top < window.innerHeight && box.bottom > 0) {
          reveal(el);
          observer.unobserve(el);
        }
      });
    });

    return () => {
      window.cancelAnimationFrame(settle);
      timers.forEach(window.clearTimeout);
      observer.disconnect();
      elements.forEach((el) => {
        el.classList.remove(PENDING, REVEALED);
        el.style.removeProperty("--reveal-delay");
      });
    };
    // `signal` re-runs the sweep when the page swaps its contents
    // without navigating.
  }, [pathname, signal]);

  return null;
}
