import type { Project } from "../types";
import { battleChallenges } from "./battle-challenges";
import { bossMechanics } from "./boss-mechanics";
import { customSpells } from "./custom-spells";

/** Feature demos: standalone systems. Each one must have `kind: "feature"`. */
export const demos: Project[] = [customSpells, bossMechanics, battleChallenges];
