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

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth-out
      smoothWheel: true,
      // touch-action 'pan-y' on the body still lets the browser handle gesture,
      // but Lenis layers gentle easing on top for a premium feel.
      smoothTouch: false, // keep native touch momentum on phones; it's already great
      touchMultiplier: 1.4,
      wheelMultiplier: 1,
      autoResize: true,
      lerp: reduced ? 1 : 0.12, // 1 = instant when motion-reduced
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
