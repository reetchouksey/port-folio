import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Award, Star, Target, Sparkles } from "lucide-react";
import { achievements, stats } from "../data/content.js";
import { useCountUp } from "../hooks/useCountUp.js";

const ICONS = [Trophy, Award, Star, Target, Sparkles];

export default function Achievements() {
  return (
    <div className="space-y-10 sm:space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-3"
      >
        <span className="pill">
          <Trophy className="h-3.5 w-3.5" />
          Trophy Room
        </span>
        <h2 className="font-display text-[clamp(28px,8vw,48px)] sm:text-5xl font-extrabold tracking-tight text-ink-900 leading-[1.05]">
          Milestones &<span className="gradient-text"> wins</span>
        </h2>
        <p className="room-intro text-ink-600 max-w-2xl text-[15px] sm:text-base">
          A collection of moments that pushed me forward. Every project
          shipped, every bug squashed, every pixel perfected.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((s, i) => (
          <StatCard key={s.label} stat={s} delay={i * 0.06} />
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
        {achievements.map((a, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass-card flex items-start gap-4 hover:-translate-y-1 transition-transform"
            >
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-200 to-amber-400 text-amber-900 inline-flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-ink-900">{a.title}</div>
                <p className="text-sm text-ink-600 leading-relaxed">{a.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Certificate-style highlight */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl glass-strong p-5 sm:p-8 lg:p-10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/60 via-rose-100/40 to-violet-100/40" />
        <div className="relative grid lg:grid-cols-[1fr_auto] gap-5 sm:gap-6 items-center">
          <div>
            <div className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-ink-500">
              Certificate of Persistence
            </div>
            <h3 className="font-display text-[clamp(22px,6vw,30px)] sm:text-3xl font-bold mt-2 text-ink-900 leading-tight">
              Always learning, always shipping.
            </h3>
            <p className="mt-2 text-ink-600 max-w-xl text-[14px] sm:text-base">
              Beyond the trophies, what I&apos;m most proud of is the consistency:
              showing up, learning, building, refining — every single day.
            </p>
          </div>
          <div className="flex flex-wrap sm:flex-col gap-2 sm:gap-3">
            <Badge label="React" />
            <Badge label="Redux" />
            <Badge label="Tailwind" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ stat, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const value = useCountUp(stat.value, 1500, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass-card text-center"
    >
      <div className="font-display text-[clamp(28px,9vw,52px)] sm:text-5xl font-extrabold gradient-text leading-none">
        {value}
        {stat.suffix}
      </div>
      <div className="mt-1.5 sm:mt-1 text-[12px] sm:text-sm text-ink-500 leading-tight">{stat.label}</div>
    </motion.div>
  );
}

function Badge({ label }) {
  return (
    <div className="inline-flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full bg-white/80 border border-ink-200 text-ink-800 text-xs font-medium shadow-soft">
      <span className="h-6 w-6 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 inline-flex items-center justify-center text-amber-950 text-[10px] font-bold">
        ★
      </span>
      {label}
    </div>
  );
}
