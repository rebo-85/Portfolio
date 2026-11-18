import { reduce, hasIO } from "./env";

// ---------- Lazy video ----------
// Videos only download and play while visible, and never autoplay for reduced-motion users.
export function initVideos(): void {
  const videos = document.querySelectorAll<HTMLVideoElement>("video[data-src]");
  const load = (v: HTMLVideoElement): void => {
    if (!v.src) v.src = v.dataset.src ?? "";
  };

  if (reduce || !hasIO) {
    videos.forEach((v) => {
      v.controls = true; // the visitor decides when to play
      v.removeAttribute("role");
      load(v);
    });
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const { target, isIntersecting } of entries) {
        const v = target as HTMLVideoElement;
        if (isIntersecting) {
          load(v);
          void v.play().catch(() => undefined);
        } else {
          v.pause();
        }
      }
    },
    { threshold: 0.35 },
  );
  videos.forEach((v) => io.observe(v));
}
