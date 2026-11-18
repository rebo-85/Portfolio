import type { Site } from "../../content/types";
import { esc, link, rich, rv } from "../helpers";
import { media } from "../media";

export const heroSection = (s: Site): string => {
  const h = s.hero;
  const c = h.console;
  const hotbar = s.hotbar
    .slice(0, 9)
    .map(
      (label, i) =>
        `<li class="slot${i === 0 ? " selected" : ""}" style="--i: ${i}"><span class="slot-key" aria-hidden="true">${i + 1}</span><span class="slot-label">${esc(label)}</span></li>`,
    )
    .join("");

  return `
    <section class="hero" id="top" aria-labelledby="hero-title">
      <div class="wrap hero-stage">
        <div class="hero-content">
          <p ${rv("eyebrow")}>${esc(h.eyebrow)}</p>
          <h1 ${rv("", 1)} id="hero-title">${esc(h.title)} <span class="glow-text">${esc(h.accent)}</span></h1>
          <p ${rv("hero-copy", 2)}>${rich(h.intro)}</p>
          <ul ${rv("chips", 3)}>${h.chips.map((t) => `<li class="chip">${esc(t)}</li>`).join("")}</ul>
          <div ${rv("actions", 4)}>${h.actions
            .map((a) => link(a.href, a.label, a.primary ? "btn primary" : "btn", a.external))
            .join("")}</div>
        </div>

        <aside ${rv("console", 2, "right")} aria-label="${esc(c.title)} preview">
          <div class="console-top">
            <span><span class="status-dot" aria-hidden="true"></span> ${esc(c.label)}</span>
            <span>${esc(c.version)}</span>
          </div>
          <div class="pack-preview">
            <div class="pack-icon">${media(c.icon, true)}</div>
            <div class="pack-title"><h2>${esc(c.title)}</h2><p>${esc(c.text)}</p></div>
          </div>
          <ul class="stats">${c.stats
            .map(
              (t, i) =>
                `<li class="stat" style="--i: ${i}"><strong>${esc(t.strong)}</strong> <span>${esc(t.rest)}</span></li>`,
            )
            .join("")}</ul>
          <ul class="asset-strip">${c.assets
            .map(
              (a, i) =>
                `<li class="asset" style="--i: ${i}"><figure>${media(a.media, true)}<figcaption>${esc(a.caption)}</figcaption></figure></li>`,
            )
            .join("")}</ul>
        </aside>
      </div>
      <div class="wrap">
        <div role="group" aria-label="Core skills">
          <ol ${rv("hotbar", 5, "zoom")}>${hotbar}</ol>
        </div>
      </div>
    </section>`;
};
