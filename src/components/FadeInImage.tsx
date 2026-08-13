import { ImgHTMLAttributes, useCallback, useRef, useState } from "react";

/**
 * An image that fades up once it has actually decoded, instead of
 * snapping in line by line as it downloads.
 *
 * The catch this exists to handle is the cached image. A plain `onLoad`
 * looks right on a cold load and fails on a warm one: if the file is
 * already in cache the browser finishes it before React commits the
 * handler, the event never fires, and the picture stays at opacity 0
 * forever. So the ref callback checks `complete` at attach time and
 * treats an already-finished image as loaded.
 */
export default function FadeInImage({
  className = "",
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const [loaded, setLoaded] = useState(false);
  const seen = useRef(false);

  const markLoaded = useCallback(() => {
    if (seen.current) return;
    seen.current = true;
    setLoaded(true);
  }, []);

  const attach = useCallback(
    (node: HTMLImageElement | null) => {
      // naturalWidth guards against a broken file, which also reports
      // complete: true but has nothing to show.
      if (node?.complete && node.naturalWidth > 0) markLoaded();
    },
    [markLoaded],
  );

  return (
    <img
      {...props}
      ref={attach}
      className={`img-fade ${loaded ? "img-fade--in" : ""} ${className}`.trim()}
      onLoad={markLoaded}
    />
  );
}
