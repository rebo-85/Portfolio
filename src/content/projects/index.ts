import type { Project } from "../types";
import { battleChallenges } from "./battle-challenges";
import { bossMechanics } from "./boss-mechanics";
import { customSpells } from "./custom-spells";
import { draconian } from "./draconian";
import { windArmorPack } from "./wind-armor-pack";

export const projects: Project[] = [
  draconian,
  customSpells,
  bossMechanics,
  battleChallenges,
  windArmorPack,
];
