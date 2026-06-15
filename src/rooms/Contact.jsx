import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
} from "lucide-react";
import { Github, Linkedin } from "../components/icons/BrandIcons.jsx";
import { profile } from "../data/content.js";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
    }, 3500);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="space-y-10 sm:space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-3"
      >
        <span className="pill">
          <Mail className="h-3.5 w-3.5" />
          Reception
        </span>
        <h2 className="font-display text-[clamp(28px,8vw,48px)] sm:text-5xl font-extrabold tracking-tight text-ink-900 leading-[1.05]">
          Let&apos;s <span className="gradient-text">connect</span>
        </h2>
        <p className="room-intro text-ink-600 max-w-2xl text-[15px] sm:text-base">
          I&apos;m always interested in discussing new opportunities, frontend
          development projects, and innovative ideas. Drop a note — I&apos;ll
          reply soon.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-4 sm:gap-5">
        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="lg:col-span-2 glass-card relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-200/50 blur-3xl" />
          <div className="relative space-y-5">
            <h3 className="text-xl font-semibold text-ink-900">Reach me</h3>

            <ContactRow
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              value={profile.email}
              action={
                <button
                  onClick={copyEmail}
                  data-cursor="hover"
                  className="text-xs font-medium text-ink-500 hover:text-ink-900 inline-flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy
                    </>
                  )}
                </button>
              }
            />
            <ContactRow
              icon={<Linkedin className="h-4 w-4" />}
              label="LinkedIn"
              value="@reet-chouksey"
              href={profile.socials.linkedin}
            />
            <ContactRow
              icon={<Github className="h-4 w-4" />}
              label="GitHub"
              value="@reet-chouksey"
              href={profile.socials.github}
            />
            <ContactRow
              icon={<MapPin className="h-4 w-4" />}
              label="Location"
              value={profile.location}
            />

            <div className="pt-4 border-t border-ink-100/80">
              <div className="text-xs uppercase tracking-widest text-ink-400 mb-2">
                Status
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {profile.availability}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={onSubmit}
          className="lg:col-span-3 glass-card relative overflow-hidden"
        >
          <h3 className="text-xl font-semibold text-ink-900">Send a message</h3>
          <p className="text-sm text-ink-500 mt-1">
            Tell me about your project or opportunity.
          </p>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field
              label="Name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              placeholder="Your name"
            />
            <Field
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              placeholder="you@example.com"
            />
          </div>
          <div className="mt-3">
            <Field
              label="Message"
              textarea
              value={form.message}
              onChange={(v) => setForm({ ...form, message: v })}
              placeholder="Hey Reet, I&apos;d love to talk about…"
            />
          </div>

          <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-[11px] sm:text-xs text-ink-400 break-words">
              Or email me directly at{" "}
              <button
                type="button"
                onClick={copyEmail}
                className="underline underline-offset-2 hover:text-ink-700 break-all"
              >
                {profile.email}
              </button>
            </div>
            <button
              type="submit"
              data-cursor="hover"
              disabled={sent}
              className="btn-primary disabled:opacity-60 w-full sm:w-auto justify-center"
            >
              <Send className="h-4 w-4" />
              {sent ? "Sent!" : "Send Message"}
            </button>
          </div>

          <AnimatePresence>
            {sent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 backdrop-blur-md bg-white/70 flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 18,
                  }}
                  className="text-center"
                >
                  <div className="mx-auto h-16 w-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-soft">
                    <motion.div
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.15 }}
                    >
                      <CheckCircle2 className="h-8 w-8" />
                    </motion.div>
                  </div>
                  <div className="mt-4 text-lg font-semibold text-ink-900">
                    Message received!
                  </div>
                  <div className="text-sm text-ink-500 mt-1">
                    Thanks for reaching out — I&apos;ll get back to you shortly.
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-sm text-ink-500 pt-6 border-t border-ink-100"
      >
        Frontend Developer passionate about building modern, responsive, and
        user-focused web applications.
        <div className="mt-2 text-xs text-ink-400">
          © {new Date().getFullYear()} {profile.name}. Crafted with care.
        </div>
      </motion.footer>
    </div>
  );
}

function ContactRow({ icon, label, value, href, action }) {
  const Wrapper = href ? "a" : "div";
  const props = href
    ? { href, target: "_blank", rel: "noreferrer", "data-cursor": "hover" }
    : {};
  return (
    <Wrapper
      {...props}
      className={`flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-2xl bg-white/60 border border-ink-100 ${
        href ? "hover:bg-white transition" : ""
      }`}
    >
      <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-700 inline-flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-widest text-ink-400">
          {label}
        </div>
        <div className="text-[13px] sm:text-sm font-medium text-ink-900 truncate">{value}</div>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </Wrapper>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  textarea,
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-widest text-ink-500 font-medium">
        {label}
      </span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={5}
          className="mt-1.5 w-full rounded-2xl border border-ink-200 bg-white/80 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500/40 transition"
          required
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="mt-1.5 w-full rounded-2xl border border-ink-200 bg-white/80 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500/40 transition"
          required
        />
      )}
    </label>
  );
}
