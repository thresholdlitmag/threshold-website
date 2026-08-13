/**
 * The site's pages, in the order they appear in the navigation bar,
 * the mobile drawer, the scroll-down quick menu, and the footer.
 *
 * Add a page here once and it shows up in all four.
 */
export interface NavItem {
  to: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/gallery", label: "Gallery" },
  { to: "/e-design", label: "E-Design" },
  { to: "/shadwell", label: "Shadwell" },
  { to: "/events", label: "Events" },
  { to: "/submit", label: "Submit" },
  { to: "/masthead", label: "Masthead" },
  { to: "/contact", label: "Contact" },
];
