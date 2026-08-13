import { Work, resolveImageUrl, typeLabel } from "../data/works";

interface WorkVisualProps {
  work: Work;
  /** Show a caption line under the image. */
  caption?: boolean;
  className?: string;
}

/**
 * A visual work's image.
 *
 * When the artwork file has been uploaded we show it. When it hasn't,
 * we set the piece in type instead — its title, medium, and artist on a
 * ruled plate — rather than a generic placeholder box. We never stand in
 * another artist's image for a missing one.
 */
export default function WorkVisual({
  work,
  caption = false,
  className = "",
}: WorkVisualProps) {
  if (!work.imageUrl) {
    return (
      <div className={`art-plate ${className}`.trim()}>
        <span className="art-plate__medium">{typeLabel(work)}</span>
        <span className="art-plate__title">{work.title}</span>
        <span className="art-plate__author">{work.author}</span>
        <span className="art-plate__note">Artwork coming soon</span>
      </div>
    );
  }

  const img = (
    <img
      className={`work__img ${className}`.trim()}
      src={resolveImageUrl(work.imageUrl)}
      alt={`${work.title} — ${typeLabel(work)} by ${work.author}`}
      loading="lazy"
    />
  );

  if (!caption) return img;

  return (
    <figure className="figure">
      {img}
      <figcaption>
        {work.title} &middot; {typeLabel(work)} &middot; {work.author}
      </figcaption>
    </figure>
  );
}
