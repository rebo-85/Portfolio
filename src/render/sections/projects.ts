import { CATEGORIES, KINDS, sortedKeys } from "../../content/taxonomy";
import type { Project } from "../../content/types";
import { head } from "../helpers";
import { projectCard } from "../project-card";
import { projectDetail } from "../project-detail";

/**
 * One filter row per dimension, shown only when the projects actually differ
 * in that dimension (a single category needs no category filter).
 */
const filterGroup = <K extends string>(
  by: "category" | "kind",
  label: string,
  registry: Record<K, { label: string; order: number }>,
  used: Set<K>,
): string => {
  const keys = sortedKeys(registry).filter((k) => used.has(k));
  if (keys.length < 2) return "";
  const button = (value: string, text: string, pressed: boolean): string =>
    `<button class="filter-btn" type="button" data-filter="${value}" aria-pressed="${pressed}">${text}</button>`;
  return `<div class="filter-group" role="group" aria-label="${label}" data-filter-by="${by}">${[
    button("all", "All", true),
    ...keys.map((k) => button(k, registry[k].label, false)),
  ].join("")}</div>`;
};

export const projectsSection = (projects: Project[]): string => {
  const ordered = [...projects].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  );
  const filters =
    filterGroup(
      "category",
      "Filter by category",
      CATEGORIES,
      new Set(projects.map((p) => p.category)),
    ) + filterGroup("kind", "Filter by type", KINDS, new Set(projects.map((p) => p.kind)));

  return `
    <section id="projects" aria-labelledby="projects-title">
      <div class="wrap">
        ${head("projects", "Selected projects", "Projects")}
        ${filters ? `<div class="filter-bar" data-filter-bar hidden>${filters}</div>` : ""}
        <div class="clip-grid project-grid">${ordered.map((project, i) => projectCard(project, i)).join("")}</div>
      </div>
    </section>
    <div id="case-studies">${ordered.map(projectDetail).join("")}</div>`;
};
