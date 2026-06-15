import { motion } from "framer-motion";
import { MonitorSmartphone } from "lucide-react";
import { skillGroups } from "../data/content.js";

const ICON_MAP = {
  HTML5: { ic: "🌐", bg: "bg-orange-100 text-orange-600" },
  CSS3: { ic: "🎨", bg: "bg-sky-100 text-sky-600" },
  "JavaScript (ES6+)": { ic: "⚡", bg: "bg-amber-100 text-amber-600" },
  "React.js": { ic: "⚛", bg: "bg-cyan-100 text-cyan-700" },
  Redux: { ic: "🟣", bg: "bg-purple-100 text-purple-600" },
  "Tailwind CSS": { ic: "🌬", bg: "bg-teal-100 text-teal-600" },
  "Responsive Design": { ic: "📱", bg: "bg-emerald-100 text-emerald-600" },
  "REST APIs": { ic: "🔗", bg: "bg-blue-100 text-blue-600" },
  Git: { ic: "🌱", bg: "bg-orange-100 text-orange-600" },
  GitHub: { ic: "🐙", bg: "bg-ink-100 text-ink-700" },
  "VS Code": { ic: "💙", bg: "bg-blue-100 text-blue-600" },
  npm: { ic: "📦", bg: "bg-rose-100 text-rose-600" },
  Vite: { ic: "⚡", bg: "bg-violet-100 text-violet-600" },
  "Chrome DevTools": { ic: "🔧", bg: "bg-yellow-100 text-yellow-700" },
  "Problem Solving": { ic: "🧩", bg: "bg-pink-100 text-pink-600" },
  "Team Collaboration": { ic: "🤝", bg: "bg-teal-100 text-teal-600" },
  Communication: { ic: "💬", bg: "bg-indigo-100 text-indigo-600" },
  "Time Management": { ic: "⏱", bg: "bg-amber-100 text-amber-600" },
  Adaptability: { ic: "🌊", bg: "bg-cyan-100 text-cyan-600" },
  "Quick Learning": { ic: "🚀", bg: "bg-rose-100 text-rose-600" },
};

export default function Skills() {
  return (
    <div className="space-y-10 sm:space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-3"
      >
        <span className="pill">
          <MonitorSmartphone className="h-3.5 w-3.5" />
          Office Room
        </span>
        <h2 className="font-display text-[clamp(28px,8vw,48px)] sm:text-5xl font-extrabold tracking-tight text-ink-900 leading-[1.05]">
          The toolbox <span className="gradient-text">I work with</span>
        </h2>
        <p className="room-intro text-ink-600 max-w-2xl text-[15px] sm:text-base">
          A curated stack I use to ship modern, responsive, and delightful
          interfaces — from the basics to the build tools I love.
        </p>
      </motion.div>

      <div className="space-y-10">
        {skillGroups.map((group, idx) => (
          <motion.section
            key={group.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
          >
            <div className="flex items-end justify-between mb-4">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-ink-400">
                  Group {String(idx + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-semibold text-ink-900">
                  {group.title}
                </h3>
              </div>
              <div
                className={`hidden sm:block h-1.5 w-24 rounded-full bg-gradient-to-r ${group.accent}`}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3.5">
              {group.items.map((s, i) => (
                <SkillCard key={s.name} skill={s} delay={i * 0.04} />
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}

function SkillCard({ skill, delay }) {
  const meta = ICON_MAP[skill.name] || { ic: "✦", bg: "bg-ink-100 text-ink-700" };
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4 }}
      data-cursor="hover"
      className="glass rounded-2xl p-3 sm:p-4 group cursor-default"
    >
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div
          className={`h-9 w-9 sm:h-10 sm:w-10 rounded-xl ${meta.bg} text-base sm:text-lg flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-6 shrink-0`}
        >
          {meta.ic}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] sm:text-sm font-semibold text-ink-900 leading-tight break-words">
            {skill.name}
          </div>
          <div className="text-[10.5px] sm:text-[11px] text-ink-500 mt-0.5">{skill.level}% comfort</div>
        </div>
      </div>
      <div className="mt-3 h-1.5 w-full rounded-full bg-ink-100 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 via-fuchsia-500 to-amber-400"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
        />
      </div>
    </motion.div>
  );
}
