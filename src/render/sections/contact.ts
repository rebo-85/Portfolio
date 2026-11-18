import type { Site } from "../../content/types";
import { esc, head, link, rv } from "../helpers";

export const contactSection = (s: Site): string => `
    <section class="contact" id="contact" aria-labelledby="contact-title">
      <div class="wrap">${head("contact", s.contact.kicker, s.contact.heading, s.contact.text)}
        <div ${rv("actions", 3)}>
          ${link(`mailto:${s.contact.email}`, s.contact.email, "btn primary")}
          <button class="btn" type="button" data-copy="${esc(s.contact.discord)}">Discord <code>${esc(s.contact.discord)}</code></button>
          ${s.contact.links.map((l) => link(l.href, l.label, "btn", true)).join("")}
        </div>
      </div>
    </section>`;
