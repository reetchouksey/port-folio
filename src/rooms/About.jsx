import { motion } from "framer-motion";
import {
  BookOpen,
  Briefcase,
  GraduationCap,
  MapPin,
  Sparkles,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { profile, experience, education, services } from "../data/content.js";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

export default function About({ onOpenResume }) {
  return (
    <div className="space-y-10 sm:space-y-12">
      <motion.div {...fadeUp} className="space-y-3">
        <span className="pill">
          <BookOpen className="h-3.5 w-3.5" />
          Living Room
        </span>
        <h2 className="font-display text-[clamp(28px,8vw,48px)] sm:text-5xl font-extrabold tracking-tight text-ink-900 leading-[1.05]">
          A bit about <span className="gradient-text">me</span>
        </h2>
        <p className="room-intro text-ink-600 max-w-2xl text-[15px] sm:text-base">
          Welcome to my living room — pull up a chair. Here&apos;s a glimpse of who I
          am, where I&apos;m from, and what I love to build.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-5">
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="lg:col-span-2 glass-card relative overflow-hidden"
        >
          <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl" />
          <div className="relative space-y-4">
            <h3 className="text-xl font-semibold text-ink-900">My Story</h3>
            {profile.about.map((p, i) => (
              <p key={i} className="text-ink-600 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="glass-card space-y-4"
        >
          <h3 className="text-xl font-semibold text-ink-900">Personal</h3>
          <ul className="space-y-3 text-sm">
            <Detail label="Name" value={profile.name} />
            <Detail label="Role" value={profile.role} />
            <Detail
              label="Location"
              value={profile.location}
              icon={<MapPin className="h-3.5 w-3.5" />}
            />
            <Detail label="Experience" value={profile.experience} />
            <Detail
              label="Availability"
              value={profile.availability}
              highlight
            />
          </ul>
          <button
            type="button"
            onClick={onOpenResume}
            data-cursor="hover"
            className="btn-primary w-full mt-2"
          >
            View CV
          </button>
        </motion.div>
      </div>

      {/* Timeline */}
      <motion.div {...fadeUp} className="space-y-5">
        <div className="flex items-end justify-between">
          <h3 className="text-xl font-semibold text-ink-900">Journey</h3>
          <span className="text-xs text-ink-400">Experience & Education</span>
        </div>
        <div className="relative grid lg:grid-cols-2 gap-4 sm:gap-5">
          {experience.map((e, i) => (
            <TimelineCard
              key={i}
              icon={<Briefcase className="h-4 w-4" />}
              title={e.role}
              meta={`${e.org} · ${e.period}`}
              accent="bg-indigo-100 text-indigo-700"
              bullets={e.bullets}
              delay={0.1 + i * 0.06}
            />
          ))}
          {education.map((e, i) => (
            <TimelineCard
              key={`ed-${i}`}
              icon={<GraduationCap className="h-4 w-4" />}
              title={e.degree}
              meta={`${e.field} · ${e.period}`}
              accent="bg-rose-100 text-rose-700"
              detail={e.detail}
              delay={0.16 + i * 0.06}
            />
          ))}
        </div>
      </motion.div>

      {/* Services */}
      <motion.div {...fadeUp} className="space-y-5">
        <div className="flex items-end justify-between">
          <h3 className="text-xl font-semibold text-ink-900">What I do</h3>
          <span className="text-xs text-ink-400 inline-flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> Services
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 * i }}
              className="glass-card group hover:-translate-y-1 transition-transform"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-ink-900 to-ink-700 text-white flex items-center justify-center font-semibold mb-4">
                {s.title.charAt(0)}
              </div>
              <div className="font-semibold text-ink-900">{s.title}</div>
              <p className="text-sm text-ink-600 mt-1.5 leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function Detail({ label, value, icon, highlight }) {
  return (
    <li className="flex items-center justify-between gap-4">
      <span className="text-ink-500 text-[12px] uppercase tracking-widest">
        {label}
      </span>
      <span
        className={`inline-flex items-center gap-1.5 font-medium ${
          highlight
            ? "px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[12px]"
            : "text-ink-900 text-sm"
        }`}
      >
        {icon}
        {value}
      </span>
    </li>
  );
}

function TimelineCard({
  icon,
  title,
  meta,
  bullets,
  detail,
  accent = "bg-indigo-100 text-indigo-700",
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card relative"
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`h-9 w-9 rounded-xl ${accent} inline-flex items-center justify-center`}
        >
          {icon}
        </div>
        <div className="flex-1 leading-tight">
          <div className="font-semibold text-ink-900">{title}</div>
          <div className="text-xs text-ink-500 inline-flex items-center gap-1.5 mt-0.5">
            <Calendar className="h-3 w-3" />
            {meta}
          </div>
        </div>
      </div>
      {detail && <p className="text-sm text-ink-600">{detail}</p>}
      {bullets && (
        <ul className="space-y-2 text-sm text-ink-600 mt-2">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 text-emerald-500 shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
