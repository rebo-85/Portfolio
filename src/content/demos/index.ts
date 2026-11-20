import type { Project } from "../types";
import { bossMechanics } from "./boss-mechanics";
import { customSpells } from "./custom-spells";
import { customUI } from "./custom-ui";

/** Feature demos: standalone systems. Each one must have `kind: "feature"`. */
export const demos: Project[] = [customSpells, bossMechanics, customUI];
