import { motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { rooms } from "../data/content.js";
import ScrapbookBackdrop from "./ScrapbookBackdrop.jsx";
import RoomGlyph from "./icons/RoomGlyphs.jsx";

export default function RoomShell({ room, onClose, onNavigate, children }) {
  const others = rooms.filter((r) => r.id !== room.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[60] overflow-hidden h-dvh"
    >
      {/* Scrapbook / journal-page backdrop */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <ScrapbookBackdrop tint={room.color} room={room} />
      </motion.div>

      {/* Click-to-close overlay (under the content) */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Door open shimmer */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 0.6 }}
        exit={{ scaleY: 0, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: `radial-gradient(circle at 50% 0%, ${room.color}33, transparent 60%)`,
          transformOrigin: "50% 0%",
        }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 top-0 bottom-0 flex flex-col pointer-events-none"
      >
        <div
          className="relative flex-1 overflow-y-auto overflow-x-hidden pointer-events-auto smooth-scroll"
          data-lenis-prevent
        >
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16 sm:pb-20">
            {/* Top bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 mb-5 sm:mb-6">
              <button
                onClick={onClose}
                data-cursor="hover"
                className="inline-flex items-center gap-1.5 sm:gap-2 pl-2.5 pr-3 sm:pl-3 sm:pr-4 py-1.5 sm:py-2 rounded-full bg-cream-50/95 backdrop-blur-xl border border-ink-200/60 text-ink-700 hover:text-ink-900 hover:bg-white text-[12px] sm:text-sm font-medium transition shadow-soft shrink-0"
              >
                <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Back to House</span>
                <span className="sm:hidden">Back</span>
              </button>

              <div className="flex items-center gap-2 min-w-0 max-w-full">
                <span className="hidden sm:inline-flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-cream-50/95 backdrop-blur-xl border border-ink-200/60 text-[12px] font-medium text-ink-700 shadow-soft min-w-0 max-w-full">
                  <span
                    className="inline-flex items-center justify-center shrink-0"
                    style={{ color: room.color }}
                  >
                    <RoomGlyph roomId={room.id} size={14} />
                  </span>
                  <span className="truncate">{room.label} · {room.sub}</span>
                </span>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  data-cursor="hover"
                  className="h-9 w-9 rounded-full bg-cream-50/95 backdrop-blur-xl border border-ink-200/60 inline-flex items-center justify-center text-ink-700 hover:text-ink-900 hover:bg-white transition shadow-soft shrink-0"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Room content */}
            <div className="relative room-on-paper">{children}</div>

            {/* Bottom: jump to other rooms */}
            <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-ink-300/40">
              <div className="flex items-center justify-between mb-4 sm:mb-5 gap-3">
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-ink-500 font-mono">
                    Wander further
                  </div>
                  <div className="text-base sm:text-lg font-display font-bold text-ink-900">
                    Visit another room
                  </div>
                </div>
                <button
                  onClick={onClose}
                  data-cursor="hover"
                  className="text-[12px] sm:text-sm font-medium text-ink-600 hover:text-ink-900 transition shrink-0"
                >
                  ← Return home
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {others.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => onNavigate(r.id)}
                    data-cursor="hover"
                    className="group text-left p-3 sm:p-4 rounded-2xl bg-cream-50/90 backdrop-blur-xl border border-ink-200/60 hover:bg-white hover:-translate-y-0.5 transition shadow-soft"
                  >
                    <div
                      className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl mb-2 sm:mb-3 flex items-center justify-center"
                      style={{
                        background: `${r.color}22`,
                        color: r.color,
                        border: `1px solid ${r.color}55`,
                      }}
                    >
                      <RoomGlyph roomId={r.id} size={18} />
                    </div>
                    <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-ink-400 font-mono">
                      {r.label}
                    </div>
                    <div className="text-[13px] sm:text-sm font-semibold text-ink-900 mt-0.5 truncate">
                      {r.sub}
                    </div>
                    <div className="mt-1.5 sm:mt-2 text-[11px] sm:text-[12px] text-ink-500 group-hover:text-ink-700 transition">
                      Enter →
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
