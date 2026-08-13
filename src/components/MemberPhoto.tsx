import { useState } from "react";
import { resolveImageUrl } from "../data/works";

interface MemberPhotoProps {
  name: string;
  src?: string;
}

/** "Michelle Lin" → "ML" */
function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * A masthead portrait, with a typographic fallback.
 *
 * If the photo is missing, empty, or fails to decode — an upload that
 * didn't finish, say — we show the person's initials in a matching
 * circle instead of a broken-image icon. Drop a working file in at the
 * same path and the photo appears on its own.
 */
export default function MemberPhoto({ name, src }: MemberPhotoProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="member__initials" role="img" aria-label={name}>
        <span aria-hidden="true">{initialsOf(name)}</span>
      </div>
    );
  }

  return (
    <img
      className="member__photo"
      src={resolveImageUrl(src)}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
