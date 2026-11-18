// Filters are hidden in the server-rendered markup, so no-JS visitors see every card.
// Each group (category, kind) narrows the cards independently; a card must match all active groups.
export function initFilter(): void {
  const bar = document.querySelector<HTMLElement>("[data-filter-bar]");
  if (!bar) return;

  const cards = document.querySelectorAll<HTMLElement>(".project-card");
  const active: Record<string, string> = {};
  bar.hidden = false;

  bar.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest<HTMLButtonElement>("button[data-filter]");
    const group = button?.closest<HTMLElement>("[data-filter-by]");
    if (!button || !group || !bar.contains(group)) return;

    const by = group.dataset.filterBy ?? "";
    active[by] = button.dataset.filter ?? "all";
    group
      .querySelectorAll<HTMLButtonElement>("button[data-filter]")
      .forEach((item) => item.setAttribute("aria-pressed", String(item === button)));

    cards.forEach((card) => {
      card.hidden = Object.entries(active).some(
        ([key, value]) => value !== "all" && card.dataset[key] !== value,
      );
    });
  });
}
