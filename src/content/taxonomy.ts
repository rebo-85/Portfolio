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

/** How the project came to be. Shown on the card; `heading` and `blurb` title its group in the Projects section. */
export const KINDS = {
  commercial: {
    label: "Commercial",
    order: 0,
    heading: "Commercial work",
    blurb: "Add-ons built for commercial release or for paying clients.",
  },
  solo: {
    label: "Solo release",
    order: 1,
    heading: "Solo releases",
    blurb: "Personal projects I designed, built and released myself.",
  },
  feature: {
    label: "Feature demo",
    order: 2,
    heading: "Feature demos",
    blurb: "Standalone systems that show what I can build for your project.",
  },
  contract: {
    label: "Contract",
    order: 3,
    heading: "Contract work",
    blurb: "Work-for-hire built to a client's brief.",
  },
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
