import { image } from "../media";
import type { Project } from "../types";

export const windArmorPack: Project = {
  id: "wind-armor-pack",
  kind: "solo",
  title: "Wind Armor Pack",
  summary: "Custom armor set with Script API abilities and a set bonus.",
  year: 2026,
  status: "released",
  accent: "cyan",
  tags: ["Custom items", "Script API", "Resource pack"],
  cover: image("wind-chestplate-icon.png", "Wind armor icon"),
};
