import useScrolledPast from "../hooks/useScrolledPast";

/**
 * A small arrow in the bottom-right corner that scrolls back to the top.
 * Appears only once there is something to scroll back up from.
 */
export default function BackToTop() {
  const visible = useScrolledPast(600);

  function toTop() {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <button
      className={`back-to-top ${visible ? "back-to-top--visible" : ""}`}
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}
