import { KINDS, LINK_KINDS } from "../content/taxonomy";
import type { Project } from "../content/types";
import { esc, link, pills, rich, rv } from "./helpers";
import { media } from "./media";
import { detailBody } from "./project-detail";

/**
 * A feature demo, shown in full inside the "Feature demos" section.
 * There is no card and no separate case study: the title, intro, tags and clips
 * appear once, in one place. The project's `cover` is therefore not displayed.
 */
export const demoBlock = (p: Project): string => {
  const d = p.detail;
  const links = p.links ?? [];

  return `
        <article class="demo" id="${esc(p.id)}" data-accent="${p.accent}" data-category="${p.category}" data-kind="${p.kind}" aria-labelledby="${esc(p.id)}-title">
          <div class="demo-head">
            <p ${rv("eyebrow section-kicker")}>${esc(d?.kicker ?? KINDS[p.kind].label)}</p>
            <h3 ${rv("demo-title", 1)} id="${esc(p.id)}-title">${esc(p.title)}</h3>
            <p ${rv("section-copy", 2)}>${rich(d?.intro ?? p.summary)}</p>
            <ul ${rv("tags", 3)}>${pills(p.tags)}</ul>
            ${
              links.length
                ? `<div class="card-links">${links
                    .map((l) => link(l.href, l.label ?? LINK_KINDS[l.kind].label, "btn", true))
                    .join("")}</div>`
                : ""
            }
          </div>
          <div class="demo-body">${
            d
              ? detailBody(p, false)
              : `<div class="gallery"><figure>${media(p.cover)}</figure></div>`
          }
          </div>
        </article>`;
};
