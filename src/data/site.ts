/**
 * Site-wide settings you may want to change without touching any page code.
 *
 * Everything in this file is plain text — edit the value between the
 * quotes, save, and the whole site updates.
 */

/**
 * ── PASTE THE GOOGLE FORM LINK HERE ──────────────────────────────────
 *
 * Open your submissions Google Form, click "Send", choose the link tab
 * (the chain icon), and copy the address. It looks like:
 *
 *   https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform
 *
 * Replace the placeholder below with that address, keeping the quotes.
 * Both the Submit page button and the Shadwell page button use it.
 *
 * While the placeholder is still here, the buttons stay visible but are
 * shown as "coming soon" and cannot be clicked — so nobody lands on a
 * broken link before the form is ready.
 */
export const SUBMISSION_FORM_URL = "PASTE_GOOGLE_FORM_LINK_HERE";

/** True once a real link has been pasted in above. */
export const submissionFormReady =
  SUBMISSION_FORM_URL.startsWith("http");

/** Where submission questions should go. */
export const CONTACT_EMAIL = "thresholdlitmag@gmail.com";
