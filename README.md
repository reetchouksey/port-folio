# Reet Chouksey · Interactive 3D Portfolio

An immersive single-page portfolio built around the **Developer House** concept:
the visitor lands in a virtual workspace and clicks rooms to explore — each room
opens with a cinematic transition into a beautifully animated section.

> **Stack:** React · Vite · Tailwind CSS · Framer Motion · React Three Fiber · Three.js · Drei

---

## ✨ Features

- Interactive isometric **3D house** scene (React Three Fiber) with hoverable, clickable rooms
- 5 themed rooms with smooth open/close transitions:
  - **Living Room** → About Me, journey & services
  - **Office Room** → Skills with progress meters
  - **Garage** → Project gallery with tilt cards & detail modals
  - **Trophy Room** → Achievements with animated counters
  - **Reception** → Contact form with success animation
- Animated typing hero, gradient text, glassmorphism cards, aurora blobs
- Custom cursor follower
- Light theme inspired by Apple / Linear / Stripe
- Fully responsive (works on mobile / tablet / desktop)
- Lazy-loaded room bundles for fast initial paint

---

## 🚀 Getting Started

```bash
# install
npm install

# run dev server (http://localhost:5173)
npm run dev

# build for production
npm run build

# preview production build
npm run preview
```

---

## ✏️ Customising Your Content

Edit **`src/data/content.js`** — everything (profile, projects, skills, services,
education, achievements, room labels) is centralized there.

### Replace the resume

Drop your resume PDF into `public/resume.pdf` (overwriting the placeholder).
The Download Resume button automatically picks it up.

### Update social links / email

Open `src/data/content.js` and edit the `profile` object:

```js
export const profile = {
  email: "your-email@example.com",
  socials: {
    linkedin: "https://linkedin.com/in/your-handle",
    github: "https://github.com/your-handle",
  },
  // ...
};
```

---

## 🗂 Project Structure

```
src/
├─ App.jsx                     # Root: hero + room modal switcher
├─ index.css                   # Tailwind layers + custom utilities
├─ main.jsx                    # React entry
├─ data/
│  └─ content.js               # Edit this for your content
├─ hooks/
│  └─ useCountUp.js            # CountUp animation hook
├─ components/
│  ├─ Aurora.jsx               # Background blobs
│  ├─ CursorFollower.jsx       # Custom cursor
│  ├─ Hero.jsx                 # Landing hero w/ 3D scene
│  ├─ Loader.jsx               # Initial loader
│  ├─ Navbar.jsx               # Sticky glass navbar
│  ├─ RoomMarkers.jsx          # Hovered-room tooltip
│  ├─ RoomShell.jsx            # Modal that hosts each room
│  ├─ TypingText.jsx           # Animated typing
│  ├─ icons/BrandIcons.jsx     # Custom GitHub / LinkedIn icons
│  └─ three/
│     ├─ HouseScene.jsx        # Main R3F isometric house
│     └─ rooms/                # Per-room 3D props
└─ rooms/                      # Per-room HTML content
   ├─ About.jsx
   ├─ Skills.jsx
   ├─ Projects.jsx
   ├─ Achievements.jsx
   └─ Contact.jsx
```

---

## 🎨 Theme Tokens

The colour palette and glass utilities live in `tailwind.config.js` and
`src/index.css`. The most useful classes:

- `.glass`, `.glass-strong`, `.glass-card` — glassmorphism surfaces
- `.btn-primary`, `.btn-ghost` — buttons
- `.gradient-text` — animated gradient headline
- `.bg-grid` — subtle dotted grid background

---

## 📜 License

Personal portfolio — feel free to fork & adapt for your own use.
