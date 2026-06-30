import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Initialise Lenis once for the whole page so vertical wheel/trackpad scroll
 * uses eased, frame-based motion on desktop.
 *
 * Touch devices use **native** scroll — Lenis's `smoothTouch` mode is the
 * single biggest jank source on Android Chrome / Samsung Internet because it
 * intercepts the OS-level fling/inertia. iOS Safari already has world-class
 * momentum scrolling, so we let the platform handle it there too.
 *
 * Modal-style scroll containers (RoomShell, Resume) opt out via the
 * `data-lenis-prevent` attribute, so they keep native scroll.
 *
 * Honours `prefers-reduced-motion` — skips Lenis entirely so the browser's
 * native scroll behaviour is used as-is.
 */
export default function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const isTouch =
      window.matchMedia?.("(hover: none) and (pointer: coarse)").matches ?? false;

    if (reduced || isTouch) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      syncTouch: false,
      touchMultiplier: 1.4,
      wheelMultiplier: 1,
      autoResize: true,
      lerp: 0.12,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
