import { ACCENTS, CATEGORIES, KINDS, LINK_KINDS } from "./taxonomy";
import type { Media, Project, Site } from "./types";

/** Element ids the page already uses: a project id becomes `#<id>` and `#<id>-title`. */
const RESERVED_IDS = [
  "top",
  "main",
  "hero",
  "about",
  "projects",
  "feature-demos",
  "project-details",
  "work",
  "skills",
  "contact",
];

const isMedia = (v: unknown): v is Media =>
  typeof v === "object" &&
  v !== null &&
  "type" in v &&
  (v.type === "image" || v.type === "video") &&
  "src" in v &&
  typeof v.src === "string";

/** Every media file referenced anywhere in the content, including video posters. */
export function collectMediaFiles(value: unknown, out = new Set<string>()): Set<string> {
  if (isMedia(value)) {
    out.add(value.src);
    if (value.poster) out.add(value.poster);
    return out;
  }
  if (Array.isArray(value)) value.forEach((v) => collectMediaFiles(v, out));
  else if (typeof value === "object" && value !== null)
    Object.values(value).forEach((v) => collectMediaFiles(v, out));
  return out;
}

/**
 * Returns a list of human-readable problems (empty = content is fine).
 * `exists` receives paths relative to public/, e.g. "media/draconian/icon.png".
 * Pure on purpose: the Vite plugin supplies the filesystem check.
 */
export function validateContent(
  site: Site,
  projects: Project[],
  exists: (publicPath: string) => boolean,
): string[] {
  const problems: string[] = [];
  const seen = new Set<string>();

  for (const p of projects) {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.id))
      problems.push(`Project id "${p.id}" must be lowercase kebab-case.`);
    if (seen.has(p.id)) problems.push(`Duplicate project id "${p.id}".`);
    seen.add(p.id);

    if (!(p.category in CATEGORIES)) problems.push(`${p.id}: unknown category "${p.category}".`);
    if (!(p.kind in KINDS)) problems.push(`${p.id}: unknown kind "${p.kind}".`);
    if (!(ACCENTS as readonly string[]).includes(p.accent))
      problems.push(`${p.id}: unknown accent "${p.accent}".`);
    for (const l of p.links ?? [])
      if (!(l.kind in LINK_KINDS)) problems.push(`${p.id}: unknown link kind "${l.kind}".`);
    if (RESERVED_IDS.includes(p.id))
      problems.push(`Project id "${p.id}" clashes with an id the page already uses.`);
  }

  for (const file of collectMediaFiles([site, projects]))
    if (!exists(file)) problems.push(`Missing media file: public/${file}`);

  return problems;
}
