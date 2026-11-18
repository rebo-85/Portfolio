import type { Site } from "../../content/types";
import { esc, head, pills, rv } from "../helpers";

export const skillsSection = (s: Site): string => `
    <section id="skills" aria-labelledby="skills-title">
      <div class="wrap">${head("skills", s.skills.kicker, s.skills.title, s.skills.intro)}
        <div class="skill-grid">${s.skills.groups
          .map(
            (g, i) => `
          <div ${rv("skill-group", i, "zoom")}>
            <h3>${esc(g.title)}</h3>
            <ul class="pills">${pills(g.core, "pill core")}${pills(g.more, "pill")}</ul>
          </div>`,
          )
          .join("")}</div>
      </div>
    </section>`;
