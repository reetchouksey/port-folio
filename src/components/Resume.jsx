import { motion } from "framer-motion";
import { X, Download, Printer, MapPin, Phone, Mail } from "lucide-react";
import { Linkedin } from "./icons/BrandIcons.jsx";
import { profile } from "../data/content.js";

const RESUME = {
  name: "REET CHOUKSEY",
  title: "Frontend Developer · UI",
  location: "Bhopal, Madhya Pradesh",
  phone: "+91 92380 85238",
  email: "reetchouksey004@gmail.com",
  linkedin: "linkedin.com/in/reet-chouksey-8a51b9323",
  linkedinUrl:
    "https://www.linkedin.com/in/reet-chouksey-8a51b9323",

  summary:
    "Frontend Developer (UI) focused on building responsive, user-friendly web interfaces with React, Redux, and Tailwind CSS. Currently a Trainee Software Development Engineer, shipping production dashboards, client websites, and full application UIs from design to deployment. Strong at translating designs into pixel-perfect, reusable components, integrating REST APIs, and accelerating delivery with Git workflows and AI-assisted tools like Cursor and Antigravity.",

  education: [
    {
      school: "Barkatullah University",
      degree: "Bachelor of Computer Applications (BCA)",
      period: "2024 — 2027 (Present)",
    },
  ],

  skills: [
    {
      label: "Frontend",
      items:
        "HTML5, CSS3, JavaScript (ES6+), React.js, Redux (Redux Toolkit), Tailwind CSS, responsive design, Flexbox, CSS Grid",
    },
    {
      label: "UI / UX",
      items:
        "Component-based UI architecture, design-to-code (Figma → React), reusable component libraries, cross-browser compatibility, accessibility basics",
    },
    {
      label: "State & Data",
      items:
        "Redux, React Hooks, Context API, REST API integration, Axios / Fetch, React Router",
    },
    {
      label: "Tools & Workflow",
      items:
        "Git, GitHub, npm, Vite, Chrome DevTools, VS Code, debugging, Agile / Scrum basics",
    },
    {
      label: "AI Tools",
      items:
        "Cursor, Antigravity, ChatGPT, AI-assisted coding and code-review workflows",
    },
  ],

  experience: [
    {
      company: "Netlink Software Group America Inc.",
      role: "Trainee Software Development Engineer",
      period: "Dec 2024 — Present",
      bullets: [
        "Develop responsive, production-ready web interfaces using React.js, Redux, Tailwind CSS, and JavaScript across internal and client-facing projects.",
        "Built an Employee Management Dashboard, a JobTracker application, a Netflix clone, and a construction-company website end-to-end — from UI layout to API integration.",
        "Translate UI/UX designs into pixel-perfect, reusable React components and integrate REST APIs with clean state management (Redux Toolkit, React Hooks).",
        "Collaborate in a Git/GitHub-based team workflow with code reviews, using AI-assisted tools (Cursor, Antigravity) to speed up development and debugging.",
      ],
    },
  ],

  projects: [
    {
      title: "Employee Management Dashboard",
      bullets: [
        "Built an employee management dashboard in React.js with Redux Toolkit for state management and Tailwind CSS for a clean, responsive UI.",
        "Implemented full CRUD for employee records with search, filtering, sorting, and pagination for fast navigation of large datasets.",
        "Designed reusable UI components (tables, modals, forms) with validation, reducing UI bugs and duplicate code.",
      ],
    },
    {
      title: "JobTracker — Job Application Tracking App",
      bullets: [
        "Developed a job application tracker in React.js to add, update, and organize applications by status (applied, interviewing, offer, rejected).",
        "Managed state with Redux and persisted data across sessions; built filtering, sorting, and status-summary views with Tailwind CSS for an at-a-glance pipeline.",
      ],
    },
    {
      title: "Netflix Clone",
      bullets: [
        "Recreated the Netflix browsing experience in React.js with a fully responsive UI: hero banner, scrolling category rows, and hover interactions.",
        "Integrated a movie database REST API with smooth loading states, client-side routing, search, and lazy-loaded images for fast performance on all devices.",
      ],
    },
    {
      title: "Construction Company Website",
      bullets: [
        "Designed and built a responsive multi-section marketing website for a construction business using HTML, Tailwind CSS, and JavaScript.",
        "Created services, projects gallery, testimonials, and contact sections with a mobile-first layout, optimized for fast load times and search visibility.",
      ],
    },
  ],
};

export default function Resume({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[80] overflow-hidden"
    >
      {/* Dim backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(26, 19, 8, 0.55) 0%, rgba(26, 19, 8, 0.78) 100%)",
        }}
        onClick={onClose}
      />

      {/* Toolbar (top, floating) */}
      <div className="absolute top-4 sm:top-6 inset-x-0 px-3 sm:px-6 z-10 flex flex-wrap items-center justify-between gap-2 sm:gap-3 print:hidden">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream-50/95 border border-ink-200/60 text-[11px] sm:text-[12px] font-medium text-ink-700 shadow-soft">
          <span className="font-mono uppercase tracking-[0.28em] text-[10px] text-ink-500">
            ⌁ Folio
          </span>
          <span className="hidden sm:inline">Curriculum Vitae</span>
          <span className="sm:hidden">CV</span>
        </span>
        <div className="flex items-center gap-2">
          <a
            href={profile.resumeUrl}
            download
            data-cursor="hover"
            className="inline-flex items-center gap-1.5 pl-2.5 pr-3 py-1.5 rounded-full bg-cream-50/95 border border-ink-200/60 text-[12px] font-medium text-ink-800 hover:bg-white shadow-soft transition"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Download .docx</span>
            <span className="sm:hidden">DOCX</span>
          </a>
          <button
            onClick={() => window.print()}
            data-cursor="hover"
            className="inline-flex items-center gap-1.5 pl-2.5 pr-3 py-1.5 rounded-full bg-cream-50/95 border border-ink-200/60 text-[12px] font-medium text-ink-800 hover:bg-white shadow-soft transition"
          >
            <Printer className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>
          <button
            onClick={onClose}
            aria-label="Close"
            data-cursor="hover"
            className="h-9 w-9 rounded-full bg-cream-50/95 border border-ink-200/60 inline-flex items-center justify-center text-ink-700 hover:text-ink-900 hover:bg-white shadow-soft transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Paper sheet */}
      <div
        className="absolute inset-0 overflow-y-auto overflow-x-hidden pt-20 sm:pt-24 pb-10 smooth-scroll"
        data-lenis-prevent
      >
        <motion.article
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="resume-sheet relative mx-auto w-[min(96%,860px)] bg-cream-50 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)] print:shadow-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 50% 0%, rgba(212,160,76,0.12) 0%, transparent 55%), var(--paper-grain)",
          }}
        >
          {/* Decorative tape strip top-left */}
          <div
            className="absolute -top-3 left-10 w-32 h-6 rotate-[-4deg] print:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(177,92,64,0.85), rgba(154,71,49,0.85))",
              boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
            }}
          />
          <div
            className="absolute -top-3 right-12 w-28 h-6 rotate-[5deg] print:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(212,160,76,0.85), rgba(201,138,53,0.85))",
              boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
            }}
          />

          <div className="px-5 sm:px-12 pt-10 sm:pt-14 pb-8 sm:pb-14">
            {/* Header */}
            <header className="border-b-2 border-ink-900 pb-6 mb-8">
              <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-ink-500 mb-2">
                ⌁ Folio · 2026 · Edition I
              </div>
              <h1 className="font-display text-[40px] sm:text-[56px] leading-[0.95] font-black text-ink-900 tracking-tight">
                {RESUME.name}
              </h1>
              <div className="mt-2 font-display italic text-lg sm:text-xl text-ink-700">
                {RESUME.title}
              </div>

              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[12.5px] text-ink-600">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {RESUME.location}
                </span>
                <a
                  href={`tel:${RESUME.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-1.5 hover:text-ink-900 transition"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {RESUME.phone}
                </a>
                <a
                  href={`mailto:${RESUME.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-ink-900 transition"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {RESUME.email}
                </a>
                <a
                  href={RESUME.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-ink-900 transition"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  {RESUME.linkedin}
                </a>
              </div>
            </header>

            {/* Summary */}
            <Section number="01" title="Summary">
              <p className="text-[14.5px] sm:text-[15.5px] leading-relaxed text-ink-800">
                {RESUME.summary}
              </p>
            </Section>

            {/* Education */}
            <Section number="02" title="Education">
              <ul className="space-y-3">
                {RESUME.education.map((e, i) => (
                  <li
                    key={i}
                    className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
                  >
                    <span className="font-display text-lg font-semibold text-ink-900">
                      {e.school}
                    </span>
                    <span className="text-[14px] text-ink-700">
                      — {e.degree}
                    </span>
                    <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
                      {e.period}
                    </span>
                  </li>
                ))}
              </ul>
            </Section>

            {/* Skills */}
            <Section number="03" title="Skills">
              <dl className="grid sm:grid-cols-[140px_1fr] gap-y-3 gap-x-6">
                {RESUME.skills.map((s, i) => (
                  <div key={i} className="contents">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500 sm:pt-0.5">
                      {s.label}
                    </dt>
                    <dd className="text-[14px] text-ink-800 leading-relaxed">
                      {s.items}
                    </dd>
                  </div>
                ))}
              </dl>
            </Section>

            {/* Experience */}
            <Section number="04" title="Experience">
              {RESUME.experience.map((x, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-display text-lg font-semibold text-ink-900">
                      {x.company}
                    </span>
                    <span className="text-[14px] italic text-ink-700">
                      — {x.role}
                    </span>
                    <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
                      {x.period}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {x.bullets.map((b, j) => (
                      <BulletItem key={j}>{b}</BulletItem>
                    ))}
                  </ul>
                </div>
              ))}
            </Section>

            {/* Projects */}
            <Section number="05" title="Projects">
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                {RESUME.projects.map((p, i) => (
                  <div key={i}>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h4 className="font-display text-base font-bold text-ink-900">
                        {p.title}
                      </h4>
                    </div>
                    <ul className="space-y-1.5">
                      {p.bullets.map((b, j) => (
                        <BulletItem key={j} small>
                          {b}
                        </BulletItem>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            {/* Footer */}
            <footer className="mt-10 pt-5 border-t border-ink-300/50 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.22em] text-ink-500">
              <span>⌁ End of Folio</span>
              <span>{RESUME.location} · 2026</span>
            </footer>
          </div>
        </motion.article>
      </div>
    </motion.div>
  );
}

function Section({ number, title, children }) {
  return (
    <section className="mb-9">
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-ink-500">
          {number}
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight">
          {title}
        </h2>
        <span className="flex-1 h-px bg-ink-300/50" />
      </div>
      {children}
    </section>
  );
}

function BulletItem({ children, small }) {
  return (
    <li className="flex gap-2.5">
      <span
        className={`mt-1.5 inline-block shrink-0 ${
          small ? "h-1 w-1" : "h-1.5 w-1.5"
        } rounded-full bg-ink-700`}
      />
      <span
        className={`${
          small ? "text-[13px] leading-relaxed" : "text-[14px] leading-relaxed"
        } text-ink-800`}
      >
        {children}
      </span>
    </li>
  );
}
