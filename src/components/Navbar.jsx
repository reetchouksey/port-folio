import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X, Home } from "lucide-react";
import { Github, Linkedin } from "./icons/BrandIcons.jsx";
import RoomGlyph from "./icons/RoomGlyphs.jsx";
import { rooms, profile } from "../data/content.js";

/**
 * Responsive Navbar
 * Breakpoints:
 *   < md  : logo + hamburger
 *   md+   : logo + name + (resume) + hamburger
 *   xl+   : logo + name + nav-links + socials + resume (no hamburger)
 * The drawer (panel below the bar) appears at < xl when the user opens the menu.
 */
export default function Navbar({ onNavigate, active, onOpenResume }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [active]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-3 inset-x-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none pt-safe"
    >
      <div className="w-full max-w-5xl pointer-events-auto">
        <nav
          className={`relative flex items-center gap-2 rounded-full pl-2 pr-2 py-1.5 transition-all duration-300 glass-strong ${
            scrolled ? "shadow-soft" : ""
          }`}
        >
          {/* Brand */}
          <button
            onClick={() => onNavigate(null)}
            className="flex items-center gap-2 pl-1 pr-2 shrink-0"
            data-cursor="hover"
            aria-label="Home"
          >
            <div className="relative h-8 w-8 rounded-xl bg-gradient-to-br from-ink-900 via-amber-800 to-ink-900 flex items-center justify-center text-cream-50 font-display text-sm font-bold shadow-soft">
              R
              <motion.span
                className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-amber-500/40 to-orange-700/40 blur-md -z-10"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
            <span className="hidden sm:block text-[13px] font-semibold text-ink-900">
              {profile.firstName}
            </span>
          </button>

          {/* Desktop nav (xl+ only) */}
          <div className="hidden xl:flex items-center gap-0.5 mx-auto">
            {rooms.map((r) => (
              <button
                key={r.id}
                onClick={() => onNavigate(r.id)}
                data-cursor="hover"
                className={`relative px-3 py-1.5 rounded-full text-[12.5px] font-medium transition-colors whitespace-nowrap ${
                  active === r.id
                    ? "text-ink-900"
                    : "text-ink-600 hover:text-ink-900"
                }`}
              >
                {active === r.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-ink-900/5 border border-ink-900/10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative">{r.sub}</span>
              </button>
            ))}
          </div>

          {/* Spacer pushes right actions when nav is hidden */}
          <div className="flex-1 xl:hidden" />

          {/* Right actions */}
          <div className="flex items-center gap-1 shrink-0">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="hidden xl:inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-600 hover:text-ink-900 hover:bg-ink-900/5 transition"
              aria-label="GitHub"
            >
              <Github className="h-3.5 w-3.5" />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="hidden xl:inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-600 hover:text-ink-900 hover:bg-ink-900/5 transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-3.5 w-3.5" />
            </a>

            <button
              type="button"
              onClick={onOpenResume}
              data-cursor="hover"
              className="inline-flex items-center gap-1.5 pl-2.5 pr-3 py-1.5 rounded-full text-white text-[12px] font-medium hover:-translate-y-0.5 transition-transform shadow-soft whitespace-nowrap"
              style={{
                background:
                  "linear-gradient(120deg, #1a1308 0%, #3b2c14 50%, #1a1308 100%)",
                boxShadow:
                  "0 1px 0 0 rgba(255,255,255,0.18) inset, 0 6px 18px -6px rgba(26, 19, 8, 0.55)",
              }}
              aria-label="View CV"
            >
              <Download className="h-3.5 w-3.5" />
              <span>CV</span>
            </button>

            {/* Hamburger — visible up through lg, hidden at xl+ */}
            <button
              onClick={() => setOpen((v) => !v)}
              data-cursor="hover"
              className="xl:hidden h-9 w-9 inline-flex items-center justify-center rounded-full bg-ink-900 text-white shrink-0"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* Mobile / tablet drawer */}
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setOpen(false)}
                className="xl:hidden fixed inset-0 -z-10 bg-ink-900/20 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="xl:hidden mt-2 glass-strong rounded-3xl p-3"
              >
                <button
                  onClick={() => onNavigate(null)}
                  data-cursor="hover"
                  className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-2xl text-left text-[13px] font-medium transition mb-2 ${
                    active === null
                      ? "bg-ink-900 text-white"
                      : "bg-white/60 text-ink-800 hover:bg-white"
                  }`}
                >
                  <Home className="h-4 w-4" />
                  Home
                </button>
                <div className="grid grid-cols-2 gap-2">
                  {rooms.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => onNavigate(r.id)}
                      data-cursor="hover"
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-2xl text-left text-[13px] font-medium transition ${
                        active === r.id
                          ? "bg-ink-900 text-white"
                          : "bg-white/60 text-ink-800 hover:bg-white"
                      }`}
                    >
                      <span
                        className="inline-flex items-center justify-center shrink-0"
                        style={{ color: active === r.id ? "#fde9b8" : r.color }}
                      >
                        <RoomGlyph roomId={r.id} size={16} />
                      </span>
                      <span className="truncate">{r.sub}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-2.5 pt-2.5 border-t border-ink-100/70 flex items-center gap-2">
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-2xl bg-white/70 text-ink-800 text-xs font-medium hover:bg-white transition"
                  >
                    <Github className="h-3.5 w-3.5" />
                    GitHub
                  </a>
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-2xl bg-white/70 text-ink-800 text-xs font-medium hover:bg-white transition"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                    LinkedIn
                  </a>
                  <button
                    type="button"
                    onClick={onOpenResume}
                    className="hidden flex-1 items-center justify-center gap-1.5 px-3 py-2 rounded-2xl bg-ink-900 text-white text-xs font-medium"
                  >
                    <Download className="h-3.5 w-3.5" />
                    CV
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
