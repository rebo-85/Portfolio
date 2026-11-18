import { site } from "../content/site";
import type { Site } from "../content/types";
import { esc } from "./helpers";
import {
  aboutSection,
  contactSection,
  heroSection,
  projectsSection,
  skillsSection,
  workSection,
} from "./sections";

export function renderApp(s: Site): string {
  const nav: [string, string][] = [
    ["About", "about"],
    ["Projects", "projects"],
    ["Work", "work"],
    ["Skills", "skills"],
  ];

  return `
  <header class="nav">
    <div class="wrap nav-inner">
      <a class="brand" href="#top" aria-label="${esc(s.brand)}, back to top">
        <span class="brand-mark" aria-hidden="true">${"<span></span>".repeat(9)}</span>
        <span class="brand-text">${esc(s.brand)}<small>${esc(s.brandSub)}</small></span>
      </a>
      <nav aria-label="Main">
        <ul class="nav-links">
          ${nav.map(([label, id]) => `<li><a href="#${esc(id)}">${esc(label)}</a></li>`).join("")}
          <li><a class="nav-cta" href="#contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main id="main">
    ${heroSection(s)}
    ${aboutSection(s)}
    ${projectsSection(s.projects)}
    ${workSection(s)}
    ${skillsSection(s)}
    ${contactSection(s)}
  </main>

  <footer>
    <div class="wrap">${s.footer.map((line) => `<p>${esc(line)}</p>`).join("")}</div>
  </footer>`;
}

export function renderPage(html: string): string {
  const title = `${site.brand} | ${site.role}`;
  const jsonld = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.brand,
    jobTitle: site.role,
    description: site.description,
    url: site.url,
    sameAs: site.contact.links.map((l) => l.href),
  }).replace(/</g, "\\u003c");
  const values: Record<string, string> = {
    lang: esc(site.lang),
    title: esc(title),
    description: esc(site.description),
    url: esc(site.url),
    ogImage: esc(new URL(site.ogImage, site.url).href),
    jsonld,
    app: renderApp(site),
  };
  return html.replace(/\{\{(\w+)\}\}/g, (_, k: string) => values[k] ?? "");
}
