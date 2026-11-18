import type { Site } from "../../content/types";
import { esc, head, rich, rv } from "../helpers";

export const aboutSection = (s: Site): string => `
    <section id="about" aria-labelledby="about-title">
      <div class="wrap about-grid">
        <div>${head("about", s.about.kicker, s.about.title)}
          <dl ${rv("facts", 3)}>${s.about.facts
            .map((x) => `<div class="fact"><dt>${esc(x.label)}</dt><dd>${esc(x.value)}</dd></div>`)
            .join("")}</dl>
        </div>
        <div ${rv("about-text", 2, "right")}>${s.about.paragraphs.map((p) => `<p>${rich(p)}</p>`).join("")}</div>
      </div>
    </section>`;
