import type { Project, ProjectKind, Site, WorkPanel } from "../content/types";
import { esc, head, link, pills, rich, rv } from "./helpers";
import { media } from "./media";
import { KIND_LABEL, projectCard } from "./project-card";
import { projectDetail } from "./project-detail";

const panel = (p: WorkPanel, i: number): string => `
        <article ${rv("panel", i, i % 2 ? "right" : "left")}>
          <h3>${esc(p.title)}</h3>
          ${p.paragraphs.map((t) => `<p>${rich(t)}</p>`).join("")}
          <ul class="tags">${pills(p.tags)}</ul>
          ${p.media ? `<div class="panel-media">${media(p.media)}</div>` : ""}
          ${p.mediaNote ? `<p class="media-note">${esc(p.mediaNote)}</p>` : ""}
          ${
            p.terminal
              ? `<div class="terminal">
            <div class="term-bar" aria-hidden="true"><span></span><span></span><span></span></div>
            <dl>${p.terminal
              .map(
                (l) => `<div class="term-line"><dt>${esc(l.key)}</dt><dd>${esc(l.text)}</dd></div>`,
              )
              .join("")}</dl>
          </div>`
              : ""
          }
        </article>`;

export const heroSection = (s: Site): string => {
  const h = s.hero;
  const c = h.console;
  const hotbar = s.hotbar
    .slice(0, 9)
    .map(
      (label, i) =>
        `<li class="slot${i === 0 ? " selected" : ""}" style="--i: ${i}"><span class="slot-key" aria-hidden="true">${i + 1}</span><span class="slot-label">${esc(label)}</span></li>`,
    )
    .join("");

  return `
    <section class="hero" id="top" aria-labelledby="hero-title">
      <div class="wrap hero-stage">
        <div class="hero-content">
          <p ${rv("eyebrow")}>${esc(h.eyebrow)}</p>
          <h1 ${rv("", 1)} id="hero-title">${esc(h.title)} <span class="glow-text">${esc(h.accent)}</span></h1>
          <p ${rv("hero-copy", 2)}>${rich(h.intro)}</p>
          <ul ${rv("chips", 3)}>${h.chips.map((t) => `<li class="chip">${esc(t)}</li>`).join("")}</ul>
          <div ${rv("actions", 4)}>${h.actions
            .map((a) => link(a.href, a.label, a.primary ? "btn primary" : "btn", a.external))
            .join("")}</div>
        </div>

        <aside ${rv("console", 2, "right")} aria-label="${esc(c.title)} preview">
          <div class="console-top">
            <span><span class="status-dot" aria-hidden="true"></span> ${esc(c.label)}</span>
            <span>${esc(c.version)}</span>
          </div>
          <div class="pack-preview">
            <div class="pack-icon">${media(c.icon, true)}</div>
            <div class="pack-title"><h2>${esc(c.title)}</h2><p>${esc(c.text)}</p></div>
          </div>
          <ul class="stats">${c.stats
            .map(
              (t, i) =>
                `<li class="stat" style="--i: ${i}"><strong>${esc(t.strong)}</strong> <span>${esc(t.rest)}</span></li>`,
            )
            .join("")}</ul>
          <ul class="asset-strip">${c.assets
            .map(
              (a, i) =>
                `<li class="asset" style="--i: ${i}"><figure>${media(a.media, true)}<figcaption>${esc(a.caption)}</figcaption></figure></li>`,
            )
            .join("")}</ul>
        </aside>
      </div>
      <div class="wrap">
        <div role="group" aria-label="Core skills">
          <ol ${rv("hotbar", 5, "zoom")}>${hotbar}</ol>
        </div>
      </div>
    </section>`;
};

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

const projectKindOrder: ProjectKind[] = ["commercial", "solo", "experiment", "contract"];

export const projectsSection = (projects: Project[]): string => {
  const ordered = [...projects].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  );
  const kinds = projectKindOrder.filter((kind) =>
    projects.some((project) => project.kind === kind),
  );
  const filters = [
    `<button class="filter-btn" type="button" data-filter="all" aria-pressed="true">All</button>`,
    ...kinds.map(
      (kind) =>
        `<button class="filter-btn" type="button" data-filter="${kind}" aria-pressed="false">${KIND_LABEL[kind]}</button>`,
    ),
  ].join("");

  return `
    <section id="projects" aria-labelledby="projects-title">
      <div class="wrap">
        ${head("projects", "Selected projects", "Projects")}
        <div class="filter-bar" data-filter-bar role="group" aria-label="Filter projects" hidden>${filters}</div>
        <div class="clip-grid project-grid">${ordered.map((project, i) => projectCard(project, i)).join("")}</div>
      </div>
    </section>
    <div id="case-studies">${ordered.map(projectDetail).join("")}</div>`;
};

export const workSection = (s: Site): string => `
    <section id="work" aria-labelledby="work-title">
      <div class="wrap">${head("work", s.work.kicker, s.work.title, s.work.intro)}
        <div class="panel-grid">${s.work.panels.map(panel).join("")}</div>
      </div>
    </section>`;

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
