import type { LinkKind, Project, ProjectKind } from "../content/types";
import { esc, link, pills, rich, rv } from "./helpers";
import { media } from "./media";

export const KIND_LABEL: Record<ProjectKind, string> = {
  commercial: "Commercial",
  solo: "Solo release",
  experiment: "Experiment",
  contract: "Contract",
};

const LINK_LABEL: Record<LinkKind, string> = {
  curseforge: "CurseForge",
  mcpedl: "MCPEDL",
  github: "GitHub",
  youtube: "YouTube",
  marketplace: "Marketplace",
  web: "Website",
};

export const projectCard = (p: Project, i: number): string => `
  <article ${rv("clip project-card", i % 3, "zoom")} data-accent="${p.accent}" data-kind="${p.kind}">
    <div class="clip-media">${media(p.cover)}</div>
    <div class="clip-body">
      <p class="eyebrow">${KIND_LABEL[p.kind]}${p.year ? ` · ${p.year}` : ""}</p>
      <h3>${esc(p.title)}</h3>
      <p>${rich(p.summary)}</p>
      <ul class="tags">${pills(p.tags.slice(0, 4))}</ul>
      <div class="card-links">
        ${p.detail ? link(`#${p.id}`, "Case study", "btn primary") : ""}
        ${(p.links ?? [])
          .map((l) => link(l.href, l.label ?? LINK_LABEL[l.kind], "btn", true))
          .join("")}
      </div>
    </div>
  </article>`;
