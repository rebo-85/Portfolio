// ---------- Gallery lightbox ----------
// Gallery thumbnails are plain links to the full image (`a[data-lightbox]` inside `[data-gallery]`),
// so without JS they simply open the image. With JS a click opens it in a modal <dialog> with
// prev/next, arrow keys, swipe and a caption.
//
// The lightbox is appended to <body>, not inside the project overlay, on purpose: it stacks on top
// of that dialog, and Esc, clicks and keys inside it never reach the overlay's own handlers, so
// closing the lightbox leaves the project open. It does not touch the URL hash (the hash belongs
// to the project overlay).

interface Lightbox {
  dialog: HTMLDialogElement;
  img: HTMLImageElement;
  caption: HTMLElement;
  count: HTMLElement;
  prev: HTMLButtonElement;
  next: HTMLButtonElement;
}

const SWIPE_MIN = 50; // px a horizontal drag must travel to count as a swipe

export function initGallery(): void {
  if (typeof HTMLDialogElement === "undefined") return;

  let box: Lightbox | undefined;
  let items: HTMLAnchorElement[] = [];
  let index = 0;
  let opener: HTMLElement | undefined;

  const build = (): Lightbox | undefined => {
    const dialog = document.createElement("dialog");
    dialog.className = "lightbox";
    dialog.setAttribute("aria-label", "Image viewer");
    dialog.innerHTML = `
      <div class="lightbox-stage" tabindex="-1" autofocus>
        <button class="lightbox-btn lightbox-close" type="button" aria-label="Close image viewer">&times;</button>
        <button class="lightbox-btn lightbox-prev" type="button" aria-label="Previous image">&larr;</button>
        <button class="lightbox-btn lightbox-next" type="button" aria-label="Next image">&rarr;</button>
        <figure class="lightbox-figure"><img alt="" decoding="async" /></figure>
        <div class="lightbox-foot">
          <p class="lightbox-caption" aria-live="polite"></p>
          <p class="lightbox-count"></p>
        </div>
      </div>`;

    const img = dialog.querySelector<HTMLImageElement>(".lightbox-figure img");
    const caption = dialog.querySelector<HTMLElement>(".lightbox-caption");
    const count = dialog.querySelector<HTMLElement>(".lightbox-count");
    const prev = dialog.querySelector<HTMLButtonElement>(".lightbox-prev");
    const next = dialog.querySelector<HTMLButtonElement>(".lightbox-next");
    const close = dialog.querySelector<HTMLButtonElement>(".lightbox-close");
    const figure = dialog.querySelector<HTMLElement>(".lightbox-figure");
    if (!img || !caption || !count || !prev || !next || !close || !figure) return undefined;

    document.body.append(dialog);

    close.addEventListener("click", () => dialog.close());
    prev.addEventListener("click", () => go(-1));
    next.addEventListener("click", () => go(1));

    // Click on the dimmed area (not the image, a button or the caption) closes it.
    dialog.addEventListener("click", (event) => {
      if (!(event.target instanceof Element)) return;
      if (event.target.closest("img, button, .lightbox-foot")) return;
      dialog.close();
    });

    // Esc closes natively (only this dialog, as it is the topmost). Arrows page through.
    dialog.addEventListener("keydown", (event) => {
      if (items.length < 2) return;
      if (event.key === "ArrowLeft") go(-1);
      else if (event.key === "ArrowRight") go(1);
      else return;
      event.preventDefault();
    });

    // Swipe on touch screens (the figure has `touch-action: pan-y`, so horizontal drags reach us).
    let startX = 0;
    let startY = 0;
    figure.addEventListener("pointerdown", (event) => {
      startX = event.clientX;
      startY = event.clientY;
    });
    figure.addEventListener("pointerup", (event) => {
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      if (items.length < 2 || Math.abs(dx) < SWIPE_MIN || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      go(dx < 0 ? 1 : -1);
    });

    dialog.addEventListener("close", () => {
      img.removeAttribute("src"); // no stale image flashing on the next open
      opener?.focus();
    });

    return { dialog, img, caption, count, prev, next };
  };

  const render = (): void => {
    const link = items[index];
    if (!box || !link) return;
    const alt = link.querySelector("img")?.alt ?? "";
    const label = link.closest("figure")?.querySelector(".shot-caption")?.textContent ?? "";
    box.img.src = link.href;
    box.img.alt = alt;
    box.caption.textContent = label || alt;
    box.count.textContent = `${index + 1} / ${items.length}`;

    const single = items.length < 2;
    box.prev.hidden = single;
    box.next.hidden = single;
    box.count.hidden = single;

    // Warm the cache for the neighbours so paging feels instant.
    for (const neighbour of [items[index + 1], items[index - 1]]) {
      if (neighbour) new Image().src = neighbour.href;
    }
  };

  function go(delta: number): void {
    if (items.length < 2) return;
    index = (index + delta + items.length) % items.length;
    render();
  }

  const open = (list: HTMLAnchorElement[], start: HTMLAnchorElement): void => {
    box ??= build();
    if (!box) return;
    items = list;
    index = Math.max(0, list.indexOf(start));
    opener = start;
    render();
    if (!box.dialog.open) box.dialog.showModal();
  };

  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; // new tab, as usual
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>("a[data-lightbox]");
    const group = link?.closest("[data-gallery]");
    if (!link || !group) return;
    event.preventDefault();
    open(Array.from(group.querySelectorAll<HTMLAnchorElement>("a[data-lightbox]")), link);
  });

  // If the page navigates (e.g. the browser Back button) while the viewer is open, close it too.
  const closeViewer = (): void => {
    if (box?.dialog.open) box.dialog.close();
  };
  window.addEventListener("popstate", closeViewer);
  window.addEventListener("hashchange", closeViewer);
}
