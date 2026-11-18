import type { Media } from "../content/types";
import { esc } from "./helpers";

export const media = (m: Media, eager = false): string =>
  m.type === "video"
    ? `<video muted loop playsinline preload="none"${m.poster ? ` poster="${esc(m.poster)}"` : ""} data-src="${esc(m.src)}" role="img" aria-label="${esc(m.alt)}"></video>`
    : `<img src="${esc(m.src)}" alt="${esc(m.alt)}" decoding="async"${eager ? "" : ` loading="lazy"`} />`;
