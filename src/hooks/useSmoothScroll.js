import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Initialise Lenis once for the whole page so vertical drag / wheel scroll
 * uses eased, frame-based motion instead of the browser's native scroll
 * (which can stutter on touch screens and during heavy paint frames).
 *
 * Modal-style scroll containers (RoomShell, Resume) opt out via the
 * `data-lenis-prevent` attribute, so they keep native scroll.
 *
 * Honours `prefers-reduced-motion` — if the user has it on, Lenis runs in
 * "instant" mode (no easing) so we never override accessibility intent.
 */
export default function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const isTouch =
      window.matchMedia?.("(hover: none) and (pointer: coarse)").matches ?? false;

    const lenis = new Lenis({
      // Slightly snappier on touch so flicks feel responsive, smoother on
      // mouse/trackpad where users expect glide.
      duration: isTouch ? 0.9 : 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth-out
      smoothWheel: true,
      // On Android Chrome and Samsung Internet, native touch scroll can feel
      // uneven on heavy pages — Lenis evens it out with a small lerp. iOS
      // Safari already has world-class momentum, so we lean lighter there.
      smoothTouch: isTouch,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
      autoResize: true,
      lerp: reduced ? 1 : isTouch ? 0.16 : 0.12,
      syncTouch: isTouch,
      syncTouchLerp: 0.075,
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
