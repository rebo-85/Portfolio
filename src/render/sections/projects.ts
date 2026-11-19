import { CATEGORIES, sortedKeys } from "../../content/taxonomy";
import type { Project } from "../../content/types";
import { demoBlock } from "../demo-block";
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

const byFeatured = (a: Project, b: Project): number =>
  Number(Boolean(b.featured)) - Number(Boolean(a.featured));

const grid = (list: Project[]): string =>
  `<div class="clip-grid project-grid">${list.map((project, i) => projectCard(project, i)).join("")}</div>`;

export const projectsSection = (projects: Project[]): string => {
  // Feature demos get their own section and are shown in full there (no card, no
  // separate case study). Everything else is a card plus a case study under "Projects".
  // The case studies are rendered as plain sections so the page works without JS; with JS
  // (behaviors/case-study.ts) they stay hidden and open in an overlay from their card.
  const main = projects.filter((p) => p.kind !== "feature").sort(byFeatured);
  const demos = projects.filter((p) => p.kind === "feature").sort(byFeatured);

  // Only the category filter is shown: the kind split is now the two sections.
  const filters = filterGroup(
    "category",
    "Filter by category",
    CATEGORIES,
    new Set(projects.map((p) => p.category)),
  );

  return `
    <section id="projects" aria-labelledby="projects-title">
      <div class="wrap">
        ${head("projects", "Selected projects", "Projects")}
        ${filters ? `<div class="filter-bar" data-filter-bar hidden>${filters}</div>` : ""}
        ${grid(main)}
      </div>
    </section>
    <div id="case-studies">${main.map(projectDetail).join("")}</div>
    ${
      demos.length
        ? `<section id="feature-demos" aria-labelledby="feature-demos-title">
      <div class="wrap">
        ${head(
          "feature-demos",
          "What I can build for you",
          "Feature demos",
          "Standalone systems that show the kind of features I can implement in your project.",
        )}
        <div class="demo-list">${demos.map(demoBlock).join("")}</div>
      </div>
    </section>`
        : ""
    }`;
};
