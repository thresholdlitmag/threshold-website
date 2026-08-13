import { useLayoutEffect } from "react";
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
/** Must outlast the reveal animation plus its longest stagger delay. */
const SETTLE_MS = 1100;

export default function ScrollReveal() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(TARGETS),
    );
    if (elements.length === 0) return;

    elements.forEach((el) => {
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
      el.classList.add(REVEALED);
      // Drop both classes once it has landed. Leaving the animation in
      // place with fill-mode: both would pin the element's transform and
      // stop :hover from ever moving it again.
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
  }, [pathname]);

  return null;
}
