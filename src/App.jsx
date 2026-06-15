import { useEffect, useState, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import MoodBoard from "./components/MoodBoard.jsx";
import EditorialFooter from "./components/EditorialFooter.jsx";
import RoomShell from "./components/RoomShell.jsx";
import CursorFollower from "./components/CursorFollower.jsx";
import Loader from "./components/Loader.jsx";
import Resume from "./components/Resume.jsx";
import useSmoothScroll from "./hooks/useSmoothScroll.js";
import { rooms } from "./data/content.js";

const About = lazy(() => import("./rooms/About.jsx"));
const Skills = lazy(() => import("./rooms/Skills.jsx"));
const Projects = lazy(() => import("./rooms/Projects.jsx"));
const Achievements = lazy(() => import("./rooms/Achievements.jsx"));
const Contact = lazy(() => import("./rooms/Contact.jsx"));

const ROOMS = {
  about: About,
  skills: Skills,
  projects: Projects,
  achievements: Achievements,
  contact: Contact,
};

export default function App() {
  const [activeRoom, setActiveRoom] = useState(null);
  const [booted, setBooted] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  useSmoothScroll();

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 1100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      activeRoom || resumeOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeRoom, resumeOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (resumeOpen) setResumeOpen(false);
        else setActiveRoom(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [resumeOpen]);

  const current = rooms.find((r) => r.id === activeRoom);
  const RoomComponent = activeRoom ? ROOMS[activeRoom] : null;

  return (
    <div className="relative min-h-svh overflow-x-clip">
      <CursorFollower />
      <AnimatePresence>{!booted && <Loader key="loader" />}</AnimatePresence>

      <Navbar
        onNavigate={setActiveRoom}
        active={activeRoom}
        onOpenResume={() => setResumeOpen(true)}
      />
      <Hero
        onEnterRoom={setActiveRoom}
        onOpenResume={() => setResumeOpen(true)}
      />
      <MoodBoard />
      <EditorialFooter onNavigate={setActiveRoom} />

      <AnimatePresence mode="wait">
        {activeRoom && current && RoomComponent && (
          <RoomShell
            key={activeRoom}
            room={current}
            onClose={() => setActiveRoom(null)}
            onNavigate={setActiveRoom}
          >
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-32 text-ink-400">
                  Loading…
                </div>
              }
            >
              <RoomComponent onOpenResume={() => setResumeOpen(true)} />
            </Suspense>
          </RoomShell>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {resumeOpen && (
          <Resume key="resume" onClose={() => setResumeOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
