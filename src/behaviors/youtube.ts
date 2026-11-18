// ---------- Click-to-load YouTube ----------
// The thumbnail is a real link, so without JS it opens YouTube. With JS it becomes an inline player.
export function initYouTube(): void {
  document.querySelectorAll<HTMLElement>(".yt[data-yt]").forEach((box) => {
    const id = box.dataset.yt;
    const play = box.querySelector<HTMLAnchorElement>(".yt-play");
    if (!id || !play) return;

    play.addEventListener("click", (e) => {
      // Let "open in new tab" gestures behave normally.
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();

      const frame = document.createElement("iframe");
      frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
      frame.title = box.dataset.title ?? "YouTube video player";
      frame.allow = "autoplay; encrypted-media; picture-in-picture";
      frame.allowFullscreen = true;
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      play.replaceWith(frame);
      frame.focus();
    });
  });
}
