import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  MapPin,
  Sparkles,
  MousePointerClick,
} from "lucide-react";
import { profile, rooms } from "../data/content.js";
import HouseSceneFallback from "./HouseSceneFallback.jsx";
import RoomMarkers from "./RoomMarkers.jsx";
import TypingText from "./TypingText.jsx";
import RoomGlyph from "./icons/RoomGlyphs.jsx";
import usePerfMode from "../hooks/usePerfMode.js";

// Three.js is ~400 KB after gzip. Only pull it in for hover-capable desktops
// that pass `usePerfMode` — phones, tablets, and reduced-motion users get
// the static 2D `HouseSceneFallback` and never download this chunk.
const HouseScene = lazy(() => import("./three/HouseScene.jsx"));

export default function Hero({ onEnterRoom, onOpenResume }) {
  const [hovered, setHovered] = useState(null);
  const { lite } = usePerfMode();

  return (
    <section
      id="home"
      className="relative min-h-svh w-full pt-20 sm:pt-24 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-10 overflow-hidden"
    >
      {/* Soft warm wash */}
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <div className="absolute -top-32 -right-20 h-[300px] w-[300px] sm:h-[440px] sm:w-[440px] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(212,160,76,0.5),transparent_60%)] blur-3xl" />
        <div className="absolute top-40 -left-20 h-[260px] w-[260px] sm:h-[400px] sm:w-[400px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(196,115,79,0.4),transparent_60%)] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[320px] w-[320px] sm:h-[460px] sm:w-[460px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(122,132,66,0.18),transparent_65%)] blur-3xl" />
      </div>

      {/* Magazine top rule */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        className="relative max-w-7xl mx-auto flex items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.24em] sm:tracking-[0.28em] text-ink-500 mb-5 sm:mb-6"
      >
        <span className="hidden sm:inline">Vol. 01 · Frontend Issue</span>
        <span className="hidden sm:inline">Bhopal · India</span>
        <span className="truncate">2026 — Spring Edition</span>
      </motion.div>

      <div className="relative max-w-7xl mx-auto">
        {/* Giant wordmark backdrop */}
        <BigWordmark />

        <div className="relative grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* LEFT: Editorial copy */}
          <div className="lg:col-span-5 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.7 }}
              className="space-y-5 sm:space-y-6"
            >
              <div className="hidden sm:flex items-center gap-3">
                <span className="h-8 w-8 rounded-full bg-ink-900 text-cream-50 inline-flex items-center justify-center font-display text-sm">
                  R
                </span>
                <div className="leading-tight">
                  <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-500">
                    Featured · Frontend Folio
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-medium text-ink-500 flex items-center gap-2">
                  <span className="text-base">👋</span>
                  <span>Hi, I&apos;m</span>
                </div>
                <h1 className="font-display text-[clamp(36px,9vw,64px)] sm:text-[56px] lg:text-[64px] font-semibold tracking-tight leading-[1.02] text-ink-900 break-words">
                  <span className="block">Reet,</span>
                  <span className="block italic font-normal text-ink-700">
                    a frontend
                  </span>
                  <span className="block">
                    <TypingText
                      words={[
                        "designer-developer",
                        "React engineer",
                        "UI craftsman",
                        "interface storyteller",
                      ]}
                    />
                  </span>
                </h1>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <span className="h-px w-8 sm:w-10 bg-ink-300" />
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.22em] text-ink-500 truncate">
                  React · Redux · Tailwind · Vite
                </span>
              </div>

              <p className="text-ink-700 text-[14px] sm:text-[15px] leading-relaxed max-w-lg">
                I shape <em className="text-ink-900 font-medium">modern, responsive</em>{" "}
                web apps with clean code, considered type, and warm colour
                palettes — turning ideas into interfaces people enjoy.
              </p>

              <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-1">
                <button
                  onClick={() => onEnterRoom("projects")}
                  className="btn-primary group flex-1 sm:flex-none justify-center min-w-0"
                  data-cursor="hover"
                >
                  <Sparkles className="h-4 w-4 shrink-0" />
                  <span className="truncate">Explore the Workspace</span>
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
                <button
                  type="button"
                  onClick={onOpenResume}
                  data-cursor="hover"
                  className="btn-ghost shrink-0"
                >
                  <Download className="h-4 w-4" />
                  CV
                </button>
              </div>

              <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 pt-2 sm:pt-3 text-[13px] sm:text-sm text-ink-600">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {profile.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    {!lite && (
                      <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                    )}
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                  </span>
                  Open to Work
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: 3D Stage */}
          <div className="lg:col-span-7 relative z-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Frame label */}
              <div className="flex items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-[0.24em] sm:tracking-[0.28em] text-ink-500 mb-2">
                <span className="truncate">— The Studio · 3D scene</span>
                <span className="hidden sm:inline shrink-0">Fig. 01</span>
              </div>

              <div className="relative aspect-[4/3] sm:aspect-[6/5] w-full">
                {/* Cream "showroom stage" */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-[2rem] overflow-hidden bg-cream-100 border border-ink-200/60 shadow-soft">
                  {lite ? (
                    <HouseSceneFallback
                      hovered={hovered}
                      onHover={setHovered}
                      onClick={onEnterRoom}
                    />
                  ) : (
                    <Suspense
                      fallback={
                        <HouseSceneFallback
                          hovered={hovered}
                          onHover={setHovered}
                          onClick={onEnterRoom}
                        />
                      }
                    >
                      <HouseScene
                        hovered={hovered}
                        onHover={setHovered}
                        onClick={onEnterRoom}
                      />
                    </Suspense>
                  )}
                  <RoomMarkers
                    hovered={hovered}
                    setHovered={setHovered}
                    onClick={onEnterRoom}
                  />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] text-ink-600">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cream-50/85 border border-ink-200/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                      <span className="font-medium">Studio</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cream-50/85 border border-ink-200/70">
                      <MousePointerClick className="h-3 w-3" />
                      <span>Click a room</span>
                    </div>
                  </div>

                  {/* Material swatch room legend */}
                  <div className="absolute bottom-3 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 flex flex-wrap items-center justify-center gap-1 sm:gap-1.5">
                    {rooms.map((r) => (
                      <button
                        key={r.id}
                        onMouseEnter={() => setHovered(r.id)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => onEnterRoom(r.id)}
                        data-cursor="hover"
                        className={`group inline-flex items-center gap-1.5 text-[10px] sm:text-[10.5px] font-medium px-2 py-1 sm:px-2.5 rounded-full border transition-all ${
                          hovered === r.id
                            ? "bg-ink-900 text-cream-50 border-ink-900"
                            : "bg-cream-50/90 text-ink-700 border-ink-200/70 hover:bg-cream-50"
                        }`}
                      >
                        <span
                          className="inline-flex items-center justify-center"
                          style={{ color: hovered === r.id ? "#fde9b8" : r.color }}
                        >
                          <RoomGlyph roomId={r.id} size={12} />
                        </span>
                        <span className="whitespace-nowrap">{r.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Editorial floating tags — animation skipped on touch /
                    reduced-motion / low-end so we don't burn frames on the
                    two infinite Y loops below. */}
                <motion.div
                  animate={lite ? undefined : { y: [0, -8, 0] }}
                  transition={
                    lite
                      ? undefined
                      : { duration: 6, repeat: Infinity, ease: "easeInOut" }
                  }
                  className="absolute -left-3 top-12 hidden sm:flex glass rounded-2xl px-3.5 py-2.5 items-center gap-2"
                >
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-amber-300 to-rose-400 flex items-center justify-center text-white text-sm font-bold">
                    ⚛
                  </div>
                  <div className="leading-tight">
                    <div className="font-mono text-[9px] uppercase tracking-widest text-ink-500">
                      Building with
                    </div>
                    <div className="text-[12px] font-display font-semibold text-ink-900">
                      React &amp; Redux
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  animate={lite ? undefined : { y: [0, 10, 0] }}
                  transition={
                    lite
                      ? undefined
                      : { duration: 7, repeat: Infinity, ease: "easeInOut" }
                  }
                  className="absolute -right-3 bottom-16 hidden sm:flex glass rounded-2xl px-3.5 py-2.5 items-center gap-2"
                >
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-orange-500 to-amber-700 flex items-center justify-center text-white text-sm font-bold">
                    ✦
                  </div>
                  <div className="leading-tight">
                    <div className="font-mono text-[9px] uppercase tracking-widest text-ink-500">
                      Crafted with
                    </div>
                    <div className="text-[12px] font-display font-semibold text-ink-900">
                      Tailwind CSS
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <ScrollDownIndicator />
    </section>
  );
}

function BigWordmark() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 -top-4 sm:-top-2 lg:top-2 flex justify-center pointer-events-none select-none z-0 overflow-hidden"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20, letterSpacing: "0.05em" }}
        animate={{ opacity: 1, y: 0, letterSpacing: "-0.06em" }}
        transition={{ duration: 1.4, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="font-display font-black tracking-[-0.06em] leading-[0.85] whitespace-nowrap
          text-[clamp(64px,16vw,220px)]
          bg-clip-text text-transparent
          bg-[linear-gradient(180deg,rgba(59,44,20,0.18)_0%,rgba(177,92,64,0.16)_50%,rgba(59,44,20,0.06)_100%)]
          drop-shadow-[0_8px_24px_rgba(59,44,20,0.18)]"
      >
        PORTFOLIO
      </motion.h2>
    </div>
  );
}

function ScrollDownIndicator() {
  const [show, setShow] = useState(true);
  const { lite } = usePerfMode();
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.div
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-ink-500 text-[10px] font-mono tracking-[0.3em] uppercase"
    >
      <span>Scroll</span>
      <motion.span
        animate={lite ? undefined : { y: [0, 6, 0] }}
        transition={
          lite
            ? undefined
            : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
        }
        className="h-6 w-[1.5px] bg-ink-400"
      />
    </motion.div>
  );
}
