import { useEffect, useState } from "react";

/**
 * Detects whether the current device should run the "full" experience
 * (smooth-scrolling, 3D scene, infinite background loops) or the "lite"
 * variant (native scroll, 2D fallback for the house, no infinite anims).
 *
 * Decision combines three signals — any one of which forces "lite":
 *   1. `prefers-reduced-motion: reduce`    (accessibility opt-out)
 *   2. Coarse pointer / no-hover           (touch phones & tablets)
 *   3. Low-end hint                        (≤ 4 cores, ≤ 4 GB RAM, or
 *                                            `Save-Data` header on)
 *
 * Mobiles with strong GPUs (recent iPhones, flagship Androids) still get a
 * scaled-down 3D scene from `HouseScene` itself — this hook is only the
 * coarse gate that the heaviest features check before mounting.
 */
export default function usePerfMode() {
  const [mode, setMode] = useState(() => detect());

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqTouch = window.matchMedia("(hover: none) and (pointer: coarse)");
    const onChange = () => setMode(detect());
    mqMotion.addEventListener?.("change", onChange);
    mqTouch.addEventListener?.("change", onChange);
    return () => {
      mqMotion.removeEventListener?.("change", onChange);
      mqTouch.removeEventListener?.("change", onChange);
    };
  }, []);

  return mode;
}

function detect() {
  if (typeof window === "undefined") {
    return {
      reducedMotion: false,
      isTouch: false,
      lowEnd: false,
      lite: false,
    };
  }
  const reducedMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  const isTouch =
    window.matchMedia?.("(hover: none) and (pointer: coarse)").matches ?? false;

  const cores =
    typeof navigator !== "undefined" ? navigator.hardwareConcurrency || 8 : 8;
  const memory =
    typeof navigator !== "undefined" && "deviceMemory" in navigator
      ? navigator.deviceMemory
      : 8;
  const saveData =
    typeof navigator !== "undefined" &&
    "connection" in navigator &&
    navigator.connection?.saveData === true;

  const lowEnd = cores <= 4 || memory <= 4 || saveData;
  const lite = reducedMotion || isTouch || lowEnd;

  return { reducedMotion, isTouch, lowEnd, lite };
}
