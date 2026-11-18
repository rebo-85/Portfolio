import type { Accent, Category, LinkKind, ProjectKind } from "./taxonomy";

export interface Link {
  label: string;
  href: string;
}

export interface Media {
  type: "video" | "image";
  src: string;
  alt: string;
  poster?: string;
}

export interface Clip {
  title: string;
  text: string;
  media: Media;
}

export type { Accent, Category, LinkKind, ProjectKind } from "./taxonomy";

export interface ExternalLink {
  kind: LinkKind;
  href: string;
  label?: string;
}

export interface ProjectPanel {
  title: string;
  text: string;
  tags: string[];
  deliverables: { label: string; text: string }[];
}

export interface Project {
  /** Unique, URL-safe. Also the name of the media folder: public/media/<id>/ */
  id: string;
  category: Category;
  kind: ProjectKind;
  title: string;
  summary: string;
  year?: number;
  status?: "released" | "in-progress" | "private" | "prototype";
  accent: Accent;
  tags: string[];
  cover: Media;
  links?: ExternalLink[];
  featured?: boolean;
  detail?: {
    intro: string;
    kicker?: string;
    clipsKicker?: string;
    clipsIntro?: string;
    youtube?: { id: string; title: string; kicker?: string };
    clips?: Clip[];
    panel?: ProjectPanel;
    gallery?: Media[];
  };
}

export interface WorkPanel {
  title: string;
  paragraphs: string[];
  tags: string[];
  media?: Media;
  mediaNote?: string;
  terminal?: { key: string; text: string }[];
}

export interface SkillGroup {
  title: string;
  core: string[];
  more: string[];
}

export interface Site {
  lang: string;
  url: string;
  ogImage: string;
  brand: string;
  brandSub: string;
  role: string;
  description: string;
  hotbar: string[];
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    intro: string;
    chips: string[];
    actions: { label: string; href: string; primary?: boolean; external?: boolean }[];
    console: {
      label: string;
      version: string;
      title: string;
      text: string;
      icon: Media;
      stats: { strong: string; rest: string }[];
      assets: { media: Media; caption: string }[];
    };
  };
  about: {
    kicker: string;
    title: string;
    facts: { label: string; value: string }[];
    paragraphs: string[];
  };
  work: { kicker: string; title: string; intro: string; panels: WorkPanel[] };
  skills: { kicker: string; title: string; intro: string; groups: SkillGroup[] };
  contact: {
    kicker: string;
    heading: string;
    text: string;
    email: string;
    discord: string;
    links: Link[];
  };
  footer: string[];
}
