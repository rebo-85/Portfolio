import { hasIO } from "./env";

// ---------- Nav highlight ----------
// Sections before the first nav link (the hero) highlight nothing.
export function initNav(): void {
  if (!hasIO) return;

  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav-links a[href^='#']"));
  const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));
  if (!links.length || !sections.length) return;

  const linkById = new Map<string, HTMLAnchorElement>();
  for (const a of links) linkById.set((a.getAttribute("href") ?? "").slice(1), a);

  const owner = new Map<HTMLElement, HTMLAnchorElement | undefined>();
  let inherited: HTMLAnchorElement | undefined;
  for (const s of sections) {
    inherited = linkById.get(s.id) ?? inherited;
    owner.set(s, inherited);
  }

  const inBand = new Set<HTMLElement>();
  let shown: HTMLAnchorElement | undefined;

  const apply = (): void => {
    let active: HTMLAnchorElement | undefined;
    for (const s of sections) if (inBand.has(s)) active = owner.get(s);

    // A short last section may never reach the middle of the screen, so at the bottom of the page it wins.
    const lastSection = sections[sections.length - 1];
    const atBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom && lastSection) active = owner.get(lastSection);

    if (active === shown) return;
    shown = active;
    for (const a of links) {
      if (a === active) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    }
  };

  // A thin band just above the middle of the viewport decides which section is "current".
  const io = new IntersectionObserver(
    (entries) => {
      for (const { target, isIntersecting } of entries) {
        if (isIntersecting) inBand.add(target as HTMLElement);
        else inBand.delete(target as HTMLElement);
      }
      apply();
    },
    { rootMargin: "-40% 0px -55% 0px" },
  );
  sections.forEach((s) => io.observe(s));
  window.addEventListener("scroll", apply, { passive: true });
}
