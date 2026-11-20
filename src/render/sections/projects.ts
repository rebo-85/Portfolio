import { CATEGORIES, KINDS, sortedKeys } from "../../content/taxonomy";
import type { Project } from "../../content/types";
import { esc, head, rv } from "../helpers";
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

/**
 * The Projects section is split into one titled group per kind (Commercial, Solo, ...).
 * Kinds with no projects are skipped, so a new kind shows up as soon as one project uses it.
 * "feature" is excluded here: demos have their own section below.
 */
const kindGroups = (list: Project[]): string =>
  sortedKeys(KINDS)
    .filter((kind) => kind !== "feature")
    .map((kind) => ({ kind, items: list.filter((p) => p.kind === kind) }))
    .filter((group) => group.items.length)
    .map(
      ({ kind, items }) => `
        <div class="kind-group" data-kind-group="${kind}" role="group" aria-labelledby="kind-${kind}-title">
          <div class="subhead kind-head">
            <h3 ${rv("kind-title", 0)} id="kind-${kind}-title">${esc(KINDS[kind].heading)}</h3>
            <p ${rv("section-copy", 1)}>${esc(KINDS[kind].blurb)}</p>
          </div>
          ${grid(items)}
        </div>`,
    )
    .join("");

const grid = (list: Project[], cta?: string): string =>
  `<div class="clip-grid project-grid">${list.map((project, i) => projectCard(project, i, cta)).join("")}</div>`;

export const projectsSection = (projects: Project[]): string => {
  // Feature demos get their own section; everything else sits under "Projects". Both show
  // a card, and the full write-up behind each card is a plain section in #project-details so the
  // page works without JS. With JS (behaviors/project-overlay.ts) those sections stay hidden and
  // open in an overlay from their card.
  const main = projects.filter((p) => p.kind !== "feature").sort(byFeatured);
  const demos = projects.filter((p) => p.kind === "feature").sort(byFeatured);

  // Only the category filter is shown: the kind split is now the titled groups (and the demos section).
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
        ${kindGroups(main)}
      </div>
    </section>
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
        ${grid(demos, "View demo")}
      </div>
    </section>`
        : ""
    }
    <div id="project-details">${[...main, ...demos].map(projectDetail).join("")}</div>
  `;
};
