import { reduce, hasIO } from "./env";

// ---------- Scroll reveal ----------
export function initReveal(): void {
  const items = document.querySelectorAll<HTMLElement>(".reveal");

  if (reduce || !hasIO) {
    items.forEach((el) => el.classList.add("visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries, observer) => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) continue;
        target.classList.add("visible");
        observer.unobserve(target);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );
  items.forEach((el) => io.observe(el));
}
