import type { Site, WorkPanel } from "../../content/types";
import { esc, head, pills, rich, rv } from "../helpers";
import { media } from "../media";

const panel = (p: WorkPanel, i: number): string => `
        <article ${rv("panel", i, i % 2 ? "right" : "left")}>
          <h3>${esc(p.title)}</h3>
          ${p.paragraphs.map((t) => `<p>${rich(t)}</p>`).join("")}
          <ul class="tags">${pills(p.tags)}</ul>
          ${p.media ? `<div class="panel-media">${media(p.media)}</div>` : ""}
          ${p.mediaNote ? `<p class="media-note">${esc(p.mediaNote)}</p>` : ""}
          ${
            p.terminal
              ? `<div class="terminal">
            <div class="term-bar" aria-hidden="true"><span></span><span></span><span></span></div>
            <dl>${p.terminal
              .map(
                (l) => `<div class="term-line"><dt>${esc(l.key)}</dt><dd>${esc(l.text)}</dd></div>`,
              )
              .join("")}</dl>
          </div>`
              : ""
          }
        </article>`;

export const workSection = (s: Site): string => `
    <section id="work" aria-labelledby="work-title">
      <div class="wrap">${head("work", s.work.kicker, s.work.title, s.work.intro)}
        <div class="panel-grid">${s.work.panels.map(panel).join("")}</div>
      </div>
    </section>`;
