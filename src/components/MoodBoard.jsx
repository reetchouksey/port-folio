import { motion } from "framer-motion";

const SWATCHES = [
  {
    label: "React",
    sub: "Component architecture",
    bg: "linear-gradient(135deg, #1a1308 0%, #3b2c14 100%)",
    fg: "#f5ede0",
    type: "espresso",
  },
  {
    label: "Tailwind",
    sub: "Utility-first styling",
    bg: "linear-gradient(135deg, #d4a04c 0%, #c98a35 100%)",
    fg: "#1a1308",
    type: "mustard",
  },
  {
    label: "Redux",
    sub: "State management",
    bg: "linear-gradient(135deg, #b15c40 0%, #9a4731 100%)",
    fg: "#f5ede0",
    type: "terracotta",
  },
  {
    label: "JavaScript",
    sub: "ES6+ engineering",
    bg: "linear-gradient(135deg, #e6c178 0%, #c98a35 100%)",
    fg: "#1a1308",
    type: "honey",
  },
  {
    label: "Vite",
    sub: "Modern tooling",
    bg: "linear-gradient(135deg, #7a8442 0%, #5e6a32 100%)",
    fg: "#f5ede0",
    type: "olive",
  },
  {
    label: "UI/UX",
    sub: "Craft & detail",
    bg: "linear-gradient(135deg, #f8f5ee 0%, #ede1cc 100%)",
    fg: "#1a1308",
    type: "marble",
  },
];

export default function MoodBoard() {
  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-12 sm:mt-16 lg:mt-24">
      <div className="flex flex-wrap items-end justify-between mb-5 sm:mb-6 gap-4">
        <div className="min-w-0">
          <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-ink-500">
            ⌁ Material Stack — A Designer&apos;s Mood Board
          </div>
          <h2 className="font-display text-xl sm:text-3xl font-semibold text-ink-900 mt-2 leading-tight">
            The textures &amp; tools <span className="italic font-normal text-ink-600">I work with</span>.
          </h2>
        </div>
        <div className="hidden sm:block text-right text-[11px] text-ink-500 font-mono uppercase tracking-widest">
          06 swatches
          <div className="h-px w-24 bg-ink-300/60 mt-2 ml-auto" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
        {SWATCHES.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.07 }}
            whileHover={{ y: -4, rotate: i % 2 === 0 ? -1 : 1 }}
            className="swatch aspect-[3/4] flex flex-col justify-between p-4 cursor-default"
            style={{ background: s.bg, color: s.fg }}
            data-cursor="hover"
          >
            <div className="flex items-start justify-between">
              <span
                className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-70"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-60">
                {s.type}
              </span>
            </div>
            <div className="space-y-1">
              <div className="font-display text-xl sm:text-2xl font-semibold leading-tight">
                {s.label}
              </div>
              <div className="text-[11px] opacity-75">{s.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
