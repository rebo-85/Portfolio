import { mediaFor } from "./media";
import type { Site } from "./types";

const siteMedia = mediaFor("site");
const draconian = mediaFor("projects/draconian");

export const site: Site = {
  lang: "en",
  url: "https://rebo-85.github.io/Portfolio/",
  ogImage: "og-image.png",
  brand: "ReBo",
  brandSub: "Minecraft Bedrock Dev",
  role: "Minecraft Bedrock Developer",
  description:
    "ReBo, Minecraft Bedrock developer working with Script API, JavaScript, JSON systems, custom items, gameplay logic and bug fixing.",
  hotbar: [
    "Script API",
    "TypeScript",
    "JSON",
    "Entities",
    "Items",
    "UI",
    "Regolith",
    "Debug",
    "Git",
  ],

  hero: {
    eyebrow: "Script API / JSON / Gameplay Systems",
    title: "Minecraft Bedrock",
    accent: "Developer",
    intro:
      "I build and repair Bedrock gameplay with **@minecraft/server, TypeScript and JSON**. Broken logic, half-finished features, systems that fall apart in-game: I turn them into things that hold up.",
    chips: [
      "Script API focused",
      "TL-PH native",
      "EN-US intermediate",
      "Private commercial project",
    ],
    actions: [
      { label: "Get in touch", href: "mailto:catalanmarben@gmail.com", primary: true },
      { label: "View projects", href: "#projects" },
    ],
    console: {
      label: "DRACONIAN_BP / production pack",
      version: "@minecraft/server 2.0.0",
      title: "Draconian Project",
      text: "Late-stage commercial Bedrock add-on with custom dragons, progression systems, combat, quests and guided player flow.",
      icon: draconian.image("draconian-bp-pack-icon.png", "Draconian behavior pack icon"),
      stats: [
        { strong: "Scripted gameplay", rest: "and custom items" },
        { strong: "Shops", rest: "and progression" },
        { strong: "UI", rest: "and VFX" },
      ],
      assets: [
        {
          media: draconian.image("dragon-menu.png", "Dragon shop preview"),
          caption: "Dragon shop",
        },
      ],
    },
  },

  about: {
    kicker: "About me",
    title: "I like taking messy systems and making them feel solid in-game.",
    facts: [
      { label: "Role", value: "Gameplay/Script Developer" },
      { label: "Stack", value: "JavaScript / TypeScript / JSON" },
      { label: "Language", value: "FIL-PH native / EN-US intermediate" },
    ],
    paragraphs: [
      "I like figuring out how a system works, where it breaks and what it needs to behave consistently. I also come from production JavaScript and TypeScript work on the web, which helps a lot when I need to read, maintain and clean up larger Bedrock codebases.",
      "In Minecraft Bedrock, I work with **Script API, entity behavior files, resource packs, UI assets and gameplay configuration**. I also use **Regolith generators** for pack automation and general workflow improvements.",
    ],
  },

  work: {
    kicker: "Additional work",
    title: "Other experience that supports the Bedrock work.",
    intro:
      "Minecraft is my main focus. This is the other work that sharpens it: shipping UI, debugging production code, and maintaining things long-term.",
    panels: [
      {
        title: "Custom Loading Screen System",
        paragraphs: [
          "During a studio technical trial, I implemented a custom loading screen system tied to world loading progress, including loading state synchronization, progress bar updates, animated spritesheet playback and Bedrock UI JSON integration.",
          "This loading screen system was later included in a released Minecraft Marketplace project.",
        ],
        tags: [
          "Bedrock UI JSON",
          "Loading Progress Sync",
          "Spritesheet Animation",
          "UI Integration",
          "Gameplay UI",
        ],
        media: siteMedia.video("load", "Custom loading screen with progress bar"),
        mediaNote:
          "Implementation and integration contribution. Visual assets were created by the project's art/UI team.",
      },
      {
        title: "Production background",
        paragraphs: [
          "Outside Minecraft, I also work on production web systems and interfaces. That experience helps with debugging, delivery rhythm and long-term maintenance.",
        ],
        tags: [
          "JavaScript / TypeScript",
          "Liferay",
          "React / Next.js",
          "Node.js / PostgreSQL",
          "Docker / Linux",
        ],
        terminal: [
          { key: "minecraft transfer", text: "legacy maintenance, debugging, release discipline" },
          {
            key: "client work",
            text: "production modules, templates and continuous feature delivery",
          },
          {
            key: "independent systems",
            text: "SaaS architecture, deploy, testing and production support",
          },
        ],
      },
    ],
  },

  skills: {
    kicker: "Toolkit",
    title: "What I can help with.",
    intro:
      "I'm strongest where scripting, JSON and debugging overlap: finding why something breaks, fixing it properly, and finishing what was started.",
    groups: [
      {
        title: "Minecraft Bedrock",
        core: ["Minecraft Script API", "@minecraft/server", "JavaScript logic"],
        more: [
          "TypeScript",
          "JSON configuration",
          "Entity behaviors",
          "Resource packs",
          "Custom items",
          "UI/HUD concepts",
          "TypeScript UI Development",
        ],
      },
      {
        title: "Production workflow",
        core: ["Debugging", "Refactoring", "Regolith generator development"],
        more: [
          "Production JavaScript/TypeScript",
          "Git / version control",
          "Pack automation",
          "Deployment and maintenance",
          "Technical English",
          "Team collaboration",
        ],
      },
    ],
  },

  contact: {
    kicker: "Let's talk",
    heading: "Got a Bedrock project that needs to work properly?",
    text: "Scripting, gameplay systems, bug fixes, new features, or pack maintenance. Send me a message and tell me what's broken or what you're building.",
    email: "catalanmarben@gmail.com",
    discord: "rebo_85",
    links: [{ label: "GitHub", href: "https://github.com/rebo-85" }],
  },

  footer: ["Copyright 2026 ReBo.", "Minecraft Bedrock Developer Portfolio"],
};
