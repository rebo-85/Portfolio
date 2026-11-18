import { KINDS } from "../content/taxonomy";
import type { Project, ProjectPanel } from "../content/types";
import { head, pills, rich, rv, esc } from "./helpers";
import { media } from "./media";

const clip = (title: string, text: string, clipMedia: Project["cover"], i: number): string => `
        <article ${rv("clip", i % 3, "zoom")}>
          <div class="clip-media">${media(clipMedia)}</div>
          <div class="clip-body"><h3>${esc(title)}</h3><p>${rich(text)}</p></div>
        </article>`;

const clipGrid = (project: Project): string =>
  `<div class="clip-grid">${(project.detail?.clips ?? [])
    .map((c, i) => clip(c.title, c.text, c.media, i))
    .join("")}</div>`;

const youtube = (y: NonNullable<NonNullable<Project["detail"]>["youtube"]>): string => `
      <div ${rv("video-block")}>
        <p class="eyebrow section-kicker">${esc(y.kicker ?? "Video demonstration")}</p>
        <div class="yt" data-yt="${esc(y.id)}" data-title="${esc(y.title)}">
          <a class="yt-play" href="https://www.youtube.com/watch?v=${esc(y.id)}" target="_blank" rel="noopener noreferrer">
            <img src="https://i.ytimg.com/vi/${esc(y.id)}/hqdefault.jpg" alt="" loading="lazy" decoding="async" />
            <span class="yt-btn" aria-hidden="true"></span>
            <span class="yt-label">Play: ${esc(y.title)}</span>
          </a>
        </div>
      </div>`;

const projectPanel = (panel: ProjectPanel): string => `
        <div ${rv("panel")}>
          <h3>${esc(panel.title)}</h3>
          <p>${rich(panel.text)}</p>
          <ul class="tags">${pills(panel.tags)}</ul>
          <dl class="deliverables">${panel.deliverables
            .map(
              (d, i) =>
                `<div class="deliverable" style="--i: ${i}"><dt>${esc(d.label)}</dt><dd>${rich(d.text)}</dd></div>`,
            )
            .join("")}</dl>
        </div>`;

export const projectDetail = (project: Project): string => {
  const detail = project.detail;
  if (!detail) return "";

  return `
    <section class="showcase" id="${esc(project.id)}" data-accent="${project.accent}" aria-labelledby="${esc(project.id)}-title">
      <div class="wrap">${head(project.id, detail.kicker ?? `${KINDS[project.kind].label} case study`, project.title, detail.intro)}
        <ul ${rv("tags", 3)}>${pills(project.tags)}</ul>
        ${
          detail.clips?.length
            ? `<div class="subhead">
                <p ${rv("eyebrow section-kicker")}>${esc(detail.clipsKicker ?? "Highlights")}</p>
                ${detail.clipsIntro ? `<p ${rv("section-copy", 1)}>${rich(detail.clipsIntro)}</p>` : ""}
              </div>${clipGrid(project)}`
            : ""
        }
        ${detail.youtube ? youtube(detail.youtube) : ""}
        ${detail.panel ? projectPanel(detail.panel) : ""}
        ${
          detail.gallery?.length
            ? `<div class="gallery">${detail.gallery
                .map(
                  (m, i) =>
                    `<figure ${rv("shot", i, i % 2 ? "right" : "left")}>${media(m)}</figure>`,
                )
                .join("")}</div>`
            : ""
        }
      </div>
    </section>`;
};
