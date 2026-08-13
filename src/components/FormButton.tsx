import { ReactNode } from "react";
import { SUBMISSION_FORM_URL, submissionFormReady } from "../data/site";
import { showerPetals } from "../lib/petals";

interface FormButtonProps {
  children: ReactNode;
  className?: string;
}

/**
 * The button that opens the submissions Google Form.
 *
 * Until a real link is pasted into SUBMISSION_FORM_URL (see data/site.ts),
 * this renders as a disabled "opening soon" button so no one clicks
 * through to a broken page.
 */
export default function FormButton({
  children,
  className = "btn",
}: FormButtonProps) {
  if (!submissionFormReady) {
    return (
      <span
        className={`${className} btn--pending`}
        role="link"
        aria-disabled="true"
        title="The submission form link has not been added yet."
      >
        {children} — opening soon
      </span>
    );
  }

  return (
    <a
      className={className}
      href={SUBMISSION_FORM_URL}
      target="_blank"
      rel="noreferrer"
      onClick={showerPetals}
    >
      {children}
    </a>
  );
}
