import type { Media } from "./types";

/**
 * Media helpers scoped to one folder under public/media/.
 * Each project uses `<group>/<id>` as its folder (group = "projects" or "demos"),
 * so file names never collide:
 *
 *   const { image, video } = mediaFor("projects/draconian");
 *   video("dragon-shop-1", "…")  ->  media/projects/draconian/dragon-shop-1.mp4 (+ -poster.webp)
 *   image("icon.png", "…")       ->  media/projects/draconian/icon.png
 *   image("a.avif", "…", "Label") ->  same, plus a caption (used by galleries)
 *
 * Site-wide assets live in the "site" folder.
 */
export function mediaFor(folder: string) {
  const base = `media/${folder}`;
  return {
    video: (name: string, alt: string, caption?: string): Media => ({
      type: "video",
      src: `${base}/${name}.mp4`,
      poster: `${base}/${name}-poster.webp`,
      alt,
      ...(caption ? { caption } : {}),
    }),
    image: (file: string, alt: string, caption?: string): Media => ({
      type: "image",
      src: `${base}/${file}`,
      alt,
      ...(caption ? { caption } : {}),
    }),
  };
}
