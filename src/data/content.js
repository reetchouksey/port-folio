export const profile = {
  name: "Reet Chouksey",
  firstName: "Reet",
  role: "Frontend Developer",
  location: "Bhopal, India",
  availability: "Open to Work",
  experience: "Fresher · Entry-Level",
  email: "reetchouksey004@gmail.com",
  socials: {
    linkedin: "https://linkedin.com/in/reet-chouksey",
    github: "https://github.com/reetchouksey",
  },
  resumeUrl: "/Reet-Chouksey-CV.docx",
  tagline: "React · Redux · JavaScript · Tailwind CSS",
  intro:
    "I build modern, responsive, and user-friendly web applications using React, Redux, JavaScript, and Tailwind CSS. Passionate about clean UI, smooth UX and scalable frontend architecture.",
  about: [
    "I'm a Frontend Developer with a strong foundation in modern web technologies. I specialize in building responsive, interactive and high-performance web applications using React, Redux, JavaScript, HTML, CSS and Tailwind CSS.",
    "I enjoy transforming ideas into visually appealing and functional user interfaces. My focus is on writing clean code, creating intuitive experiences and continuously learning to stay current with the industry.",
  ],
};

export const skillGroups = [
  {
    title: "Frontend",
    accent: "from-indigo-100 to-violet-100",
    items: [
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 80 },
      { name: "JavaScript (ES6+)", level: 80 },
      { name: "React.js", level: 80 },
      { name: "Redux", level: 80 },
      { name: "Tailwind CSS", level: 80 },
      { name: "Responsive Design", level: 95 },
      { name: "REST APIs", level: 65 },
    ],
  },
  {
    title: "Tools",
    accent: "from-rose-100 to-amber-100",
    items: [
      { name: "Git", level: 88 },
      { name: "GitHub", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "Cursor", level: 90 },
      { name: "Antigravity", level: 80 },
      { name: "npm", level: 85 },
      { name: "Vite", level: 85 },
      { name: "Chrome DevTools", level: 88 },
    ],
  },
  {
    title: "Soft Skills",
    accent: "from-emerald-100 to-sky-100",
    items: [
      { name: "Prompt Engineering", level: 90 },
      { name: "Problem Solving", level: 90 },
      { name: "Team Collaboration", level: 92 },
      { name: "Communication", level: 88 },
      { name: "Time Management", level: 85 },
      { name: "Adaptability", level: 90 },
      { name: "Quick Learning", level: 95 },
    ],
  },
];

export const services = [
  {
    title: "Frontend Development",
    desc: "Building responsive and interactive web applications using modern frontend technologies.",
    icon: "Code2",
  },
  {
    title: "UI Development",
    desc: "Creating attractive and user-friendly interfaces with clean design principles.",
    icon: "Sparkles",
  },
  {
    title: "Responsive Design",
    desc: "Websites that work seamlessly across desktop, tablet and mobile devices.",
    icon: "Monitor",
  },
  {
    title: "Performance Optimization",
    desc: "Improving application speed, responsiveness and overall user experience.",
    icon: "Gauge",
  },
];

export const projects = [
  {
    title: "Netflix Clone",
    short:
      "Netflix browsing experience rebuilt in React with real movie data.",
    description:
      "Recreated the Netflix browsing experience in React with a fully responsive UI — hero banner, scrolling category rows, hover interactions, search and a movie-database REST API integration with smooth loading states and lazy-loaded images.",
    tech: ["React", "JavaScript", "REST API"],
    features: [
      "Responsive hero banner",
      "Scrolling category rows",
      "Hover interactions",
      "Movie database REST API",
      "Search & client-side routing",
      "Lazy-loaded images",
    ],
    color: "from-amber-400 via-amber-700 to-amber-950",
    accent: "bg-amber-100",
    demo: "https://netflix-clone-eight-tawny-75.vercel.app/",
    code: "#",
  },
  {
    title: "Chef's Kitchen — Recipes App",
    short:
      "Discover recipes, watch tutorials, plan meals — powered by TheMealDB & YouTube.",
    description:
      "A recipe discovery web app pulling live data from TheMealDB and real cooking tutorials from YouTube. Users can search any dish, find recipes by ingredients they already have, browse by category & cuisine, save favorites locally, and drag recipes onto a weekly meal planner with an auto-generated shopping list.",
    tech: ["React", "JavaScript", "REST API", "Tailwind CSS"],
    features: [
      "Live recipes from TheMealDB",
      "YouTube tutorial integration",
      "Ingredient-based search",
      "Browse by category & cuisine",
      "Drag-and-drop weekly meal planner",
      "Favorites & shopping list (localStorage)",
    ],
    color: "from-orange-500 via-orange-800 to-amber-950",
    accent: "bg-orange-100",
    demo: "https://newrecipes-drab.vercel.app/",
    code: "#",
  },
  {
    title: "Employee Management Dashboard",
    short:
      "A dashboard for managing employee information and workplace operations.",
    description:
      "A dashboard application for managing employee information, attendance, leaves, departments and reports — built with React, Redux Toolkit and Tailwind CSS for usability at scale, with full CRUD, search, filtering, sorting and pagination.",
    tech: ["React", "Redux", "Tailwind CSS"],
    features: [
      "Employee Records",
      "Attendance Tracking",
      "Leave Management",
      "Department Management",
      "Search & Filter",
      "Reports Dashboard",
    ],
    color: "from-stone-400 via-stone-700 to-stone-950",
    accent: "bg-stone-200",
    demo: "https://dashboard-smoky-phi-8aws7vf3fa.vercel.app/",
    code: "#",
  },
  {
    title: "Elite Constructions Website",
    short:
      "A professional landing site showcasing services, projects and contact info.",
    description:
      "A professional multi-section marketing website for a construction business — services, project gallery, testimonials and contact sections with a mobile-first layout, optimized for fast load times and search visibility.",
    tech: ["HTML", "CSS", "JavaScript", "React"],
    features: [
      "Modern Landing Page",
      "Services Section",
      "Project Showcase",
      "Contact Form",
      "Responsive Design",
    ],
    color: "from-yellow-700 via-amber-900 to-stone-900",
    accent: "bg-yellow-100",
    demo: "https://elite-constructions-three.vercel.app/",
    code: "#",
  },
];

export const experience = [
  {
    role: "Frontend Developer · Project Work",
    period: "2024 — Present",
    org: "Self-Directed",
    bullets: [
      "Developing responsive web applications with React",
      "Building reusable React components and design systems",
      "Managing application state using Redux",
      "Integrating REST APIs with robust loading & error states",
      "Optimizing UI performance and accessibility",
      "Maintaining clean, scalable, and well-documented code",
    ],
  },
];

export const education = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    field: "Computer Applications",
    period: "Pursuing · Final Year",
    detail:
      "Currently pursuing BCA in the last year, focused on software development, web technologies and programming fundamentals.",
  },
];

export const achievements = [
  {
    title: "Multiple Frontend Projects",
    desc: "Built and shipped multiple frontend applications using React and Redux.",
  },
  {
    title: "Responsive Web Apps",
    desc: "Developed responsive web applications that work across all devices.",
  },
  {
    title: "Modern Architecture",
    desc: "Learned modern frontend architecture, state management and routing.",
  },
  {
    title: "UI/UX Craft",
    desc: "Improved UI/UX skills with a focus on micro-interactions and polish.",
  },
  {
    title: "Continuous Learning",
    desc: "Consistently exploring new technologies, tools and best practices.",
  },
];

export const stats = [
  { label: "Projects Built", value: 8, suffix: "+" },
  { label: "Technologies", value: 14, suffix: "+" },
];

export const rooms = [
  {
    id: "about",
    label: "Living Room",
    sub: "About Me",
    icon: "BookOpen",
    color: "#9a4731",
    hint: "Step into the bookshelf",
  },
  {
    id: "skills",
    label: "Office Room",
    sub: "Skills",
    icon: "MonitorSmartphone",
    color: "#d4a04c",
    hint: "Wake the monitor",
  },
  {
    id: "projects",
    label: "Garage",
    sub: "Projects",
    icon: "Laptop",
    color: "#b15c40",
    hint: "Open the laptop",
  },
  {
    id: "achievements",
    label: "Trophy Room",
    sub: "Achievements",
    icon: "Trophy",
    color: "#c98a35",
    hint: "Polish the trophy",
  },
  {
    id: "contact",
    label: "Reception",
    sub: "Contact",
    icon: "Mail",
    color: "#7a8442",
    hint: "Drop a letter",
  },
];
