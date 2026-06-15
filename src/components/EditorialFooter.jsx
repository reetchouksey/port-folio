import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { Github, Linkedin } from "./icons/BrandIcons.jsx";
import RoomGlyph from "./icons/RoomGlyphs.jsx";
import { profile, rooms } from "../data/content.js";

export default function EditorialFooter({ onNavigate }) {
  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-16 lg:mt-24 mb-10">
      <div className="grid lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Big "INDEX" panel */}
        <div className="lg:col-span-7 swatch p-5 sm:p-10 bg-cream-100">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink-500">
              ⌁ Table of Contents
            </span>
            <span className="h-px flex-1 bg-ink-300/60" />
          </div>
          <h3 className="font-display text-[clamp(28px,7vw,52px)] font-semibold tracking-tight text-ink-900 leading-[1.05]">
            Five rooms.
            <br />
            <span className="italic font-normal text-ink-700">
              one tiny studio.
            </span>
          </h3>

          <ul className="mt-8 divide-y divide-ink-200/60 border-y border-ink-200/60">
            {rooms.map((r, i) => (
              <motion.li
                key={r.id}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => onNavigate(r.id)}
                  data-cursor="hover"
                  className="w-full flex items-center justify-between gap-3 sm:gap-4 py-3.5 sm:py-4 text-left group"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500 w-8 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="inline-flex items-center justify-center shrink-0"
                      style={{ color: r.color }}
                    >
                      <RoomGlyph roomId={r.id} size={20} />
                    </span>
                    <span className="font-display text-lg sm:text-2xl font-semibold text-ink-900 truncate">
                      {r.label}
                    </span>
                    <span className="hidden md:inline text-[12px] text-ink-500 truncate">
                      — {r.sub}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] sm:text-[12px] font-mono uppercase tracking-widest text-ink-500 group-hover:text-ink-900 transition shrink-0">
                    <span>Enter</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" />
                  </span>
                </button>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right column: credits + colophon */}
        <div className="lg:col-span-5 grid gap-3 sm:gap-4">
          <div className="swatch p-5 sm:p-6 bg-[linear-gradient(135deg,#1a1308_0%,#3b2c14_100%)] text-cream-100">
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] opacity-70">
              ⌁ Get in touch
            </span>
            <h4 className="font-display text-2xl sm:text-3xl font-semibold mt-3 leading-tight">
              Want to work together?
            </h4>
            <p className="text-[13px] opacity-80 mt-3 leading-relaxed">
              I&apos;m open to junior frontend roles, freelance projects, and
              friendly chats about UI craft.
            </p>
            <div className="mt-5 flex items-center gap-2 flex-wrap">
              <button
                onClick={() => onNavigate("contact")}
                data-cursor="hover"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream-50 text-ink-900 text-[12px] font-medium hover:-translate-y-0.5 transition shadow-soft"
              >
                <Mail className="h-3.5 w-3.5" />
                Drop a letter
              </button>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-cream-100 text-[12px] font-medium hover:bg-white/20 transition"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-cream-100 text-[12px] font-medium hover:bg-white/20 transition"
              >
                <Linkedin className="h-3.5 w-3.5" />
                LinkedIn
              </a>
            </div>
          </div>

          <div className="swatch p-5 sm:p-6 bg-[linear-gradient(135deg,#d4a04c_0%,#c98a35_100%)] text-ink-900">
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] opacity-80">
              ⌁ Colophon
            </span>
            <p className="font-display text-base sm:text-lg leading-snug mt-3">
              Set in <em className="not-italic font-semibold">Fraunces</em> &amp;{" "}
              <em className="not-italic font-semibold">Inter</em>. Built with
              React, Tailwind, Framer Motion &amp; Three.js. Hand-printed on a
              warm cream base, 2026.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono uppercase tracking-[0.28em] text-ink-500">
        <span>© {new Date().getFullYear()} {profile.name} · All Rights Reserved</span>
        <span className="hidden sm:inline">Folio Vol. 01 · Spring 2026</span>
        <span>Crafted in Bhopal, India</span>
      </div>
    </section>
  );
}
