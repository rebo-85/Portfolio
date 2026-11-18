/* ==========================================================================
   The single source of truth for how projects are classified.
   To add a category, kind, link type or accent, add ONE entry here:
   the types, card labels, filter buttons and link labels all derive from it.
   `order` decides the order of the filter buttons.
   ========================================================================== */

/** What the project is about / where it runs. Drives the first filter row. */
export const CATEGORIES = {
  minecraft: { label: "Minecraft", order: 0 },
  web: { label: "Web", order: 1 },
  tools: { label: "Tools", order: 2 },
} as const;

/** How the project came to be. Shown on the card and drives the second filter row. */
export const KINDS = {
  commercial: { label: "Commercial", order: 0 },
  solo: { label: "Solo release", order: 1 },
  experiment: { label: "Experiment", order: 2 },
  contract: { label: "Contract", order: 3 },
} as const;

export const LINK_KINDS = {
  curseforge: { label: "CurseForge" },
  mcpedl: { label: "MCPEDL" },
  github: { label: "GitHub" },
  youtube: { label: "YouTube" },
  marketplace: { label: "Marketplace" },
  web: { label: "Website" },
} as const;

export const ACCENTS = ["cyan", "red", "gold", "green"] as const;

export type Category = keyof typeof CATEGORIES;
export type ProjectKind = keyof typeof KINDS;
export type LinkKind = keyof typeof LINK_KINDS;
export type Accent = (typeof ACCENTS)[number];

/** Registry keys sorted by `order`. */
export const sortedKeys = <K extends string>(registry: Record<K, { order: number }>): K[] =>
  (Object.keys(registry) as K[]).sort((a, b) => registry[a].order - registry[b].order);
