import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- CUSTOM TYPEWRITER HOOK ---
function useTypewriter(words, speed = 80, pause = 1500) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = words[currentWordIndex];
    const typingSpeed = isDeleting ? speed / 2 : speed;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), pause);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      } else {
        setDisplayText(
          fullText.substring(0, displayText.length + (isDeleting ? -1 : 1))
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex, words, speed, pause]);

  return displayText;
}

// --- NEURAL NETWORK GRAPHIC COMPONENT ---
const NeuralNetworkGraphic = () => {
  return (
    <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
          </linearGradient>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00f2fe" stopOpacity="1" />
            <stop offset="100%" stopColor="#00f2fe" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Connecting Lines */}
        <g stroke="url(#lineGradient)" strokeWidth="1.5" opacity="0.6">
          <line x1="80" y1="120" x2="200" y2="60" />
          <line x1="80" y1="120" x2="160" y2="200" />
          <line x1="200" y1="60" x2="320" y2="100" />
          <line x1="200" y1="60" x2="240" y2="240" />
          <line x1="160" y1="200" x2="240" y2="240" />
          <line x1="160" y1="200" x2="120" y2="320" />
          <line x1="320" y1="100" x2="340" y2="260" />
          <line x1="240" y1="240" x2="340" y2="260" />
          <line x1="240" y1="240" x2="260" y2="340" />
          <line x1="120" y1="320" x2="260" y2="340" />
        </g>

        {/* Neural Nodes */}
        {[
          { cx: 80, cy: 120, r: 6, color: "#00f2fe" },
          { cx: 200, cy: 60, r: 8, color: "#a855f7" },
          { cx: 320, cy: 100, r: 6, color: "#00f2fe" },
          { cx: 160, cy: 200, r: 7, color: "#38bdf8" },
          { cx: 240, cy: 240, r: 9, color: "#c084fc" },
          { cx: 340, cy: 260, r: 6, color: "#00f2fe" },
          { cx: 120, cy: 320, r: 6, color: "#a855f7" },
          { cx: 260, cy: 340, r: 7, color: "#38bdf8" },
        ].map((node, i) => (
          <g key={i}>
            <circle cx={node.cx} cy={node.cy} r={node.r * 2} fill={node.color} opacity="0.2" className="animate-ping" />
            <circle cx={node.cx} cy={node.cy} r={node.r} fill={node.color} />
          </g>
        ))}
      </svg>
    </div>
  );
};

// --- FLOATING PARTICLES BACKGROUND ---
const ParticlesBackground = () => {
  const particles = Array.from({ length: 25 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((_, i) => {
        const size = (i % 5) + 2;
        const color = i % 2 === 0 ? "rgba(6, 182, 212, 0.25)" : "rgba(168, 85, 247, 0.25)";
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              left: `${(i * 4) % 100}%`,
              top: `${(i * 7) % 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

// --- DATA CONFIGURATIONS ---
const SECTIONS = ["home", "about", "skills", "projects", "experience", "education", "certifications", "resume", "contact"];

const SKILLS_DATA = [
  {
    category: "Programming Languages",
    skills: ["Python", "C++", "C", "JavaScript", "SQL", "HTML5 & CSS3"],
    borderColor: "border-cyan-500/30",
    badgeColor: "border-cyan-700/50 bg-cyan-950/40 text-cyan-300",
  },
  {
    category: "AI, Vision & Data Science",
    skills: ["OpenCV", "MediaPipe", "NumPy", "Pandas", "Sci-kit-Learn", "Groq API"],
    borderColor: "border-purple-500/30",
    badgeColor: "border-purple-700/50 bg-purple-950/40 text-purple-300",
  },
  {
    category: "Web & Backend Engineering",
    skills: ["React.js", "Tailwind CSS", "Flask", "SQLite", "RESTful APIs", "Responsive UI"],
    borderColor: "border-blue-500/30",
    badgeColor: "border-blue-700/50 bg-blue-950/40 text-blue-300",
  },
  {
    category: "Core Fundamentals & Tools",
    skills: ["DSA", "Git & GitHub", "Linux", "VS Code", "Postman"],
    borderColor: "border-emerald-500/30",
    badgeColor: "border-emerald-700/50 bg-emerald-950/40 text-emerald-300",
  },
];

const PROJECTS_DATA = [
  {
    title: "Automated Waste Sorting Assistant",
    description:
      "A full-stack AI-powered web application using Flask, Groq API (Llama 3.2 Vision), and SQLite to automate municipal waste classification from image uploads with sub-second inference.",
    tags: ["Flask", "Python", "Groq API", "SQLite", "JavaScript"],
    githubUrl: "https://github.com/samriddhipandey1104/Automated-waste-sorting-assistant",
  },
  {
    title: "AI Air Pencil & Virtual Canvas",
    description:
      "A real-time virtual drawing application utilizing computer vision to track 21 hand landmarks, with Exponential Moving Average jitter reduction and gesture-controlled drawing.",
    tags: ["Python", "OpenCV", "MediaPipe", "NumPy"],
    githubUrl: "https://github.com/samriddhipandey1104/Air.Pencil",
  },
];

const EDUCATION_DATA = [
  {
    degree: "B.Tech in Computer Science & Engineering (AI & ML)",
    institution: "Shri Shankaracharya Technical Campus (SSTC), Bhilai",
    period: "2023 – 2027",
    grade: "CGPA: 7.55",
  },
  {
    degree: "Higher Secondary Certificate (Class XII)",
    institution: "St. Peter's Convent School",
    period: "2022 – 2023",
    grade: "Score: 70.2%",
  },
  {
    degree: "High School Certificate (Class X)",
    institution: "St. Peter's Convent School",
    period: "2020 – 2021",
    grade: "Score: 86.0%",
  },
];

const CERTIFICATIONS = [
  {
    title: "Data Science with Python Specialization",
    issuer: "Techonet Automation",
    date: "2025",
    credentialUrl: "https://drive.google.com/file/d/1tUQXKsAeXSKWP6ErOQHeO7Kzi6jdGvXT/view?usp=sharing",
  },
  {
    title: "C & C++ Programming Certification",
    issuer: "Sensible Academy",
    date: "2024",
    credentialUrl: "#"
  },
  {
    title: "Generative AI Specialization",
    issuer: "Digital Shakha",
    date: "2026",
    credentialUrl: "https://drive.google.com/file/d/1sg0wzpiBOxY8aONGcPI79xgZlo3mZdzJ/view?usp=sharing",
  },
];

// --- MAIN COMPONENT IMPLEMENTATION ---
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const typedSubtitle = useTypewriter([
    "Software Developer",
    "AI/ML Engineer",
    "Full-Stack Developer",
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      SECTIONS.forEach((sec) => {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#070b14] text-slate-100 min-h-screen relative font-sans selection:bg-cyan-500 selection:text-black">
      <ParticlesBackground />

      {/* --- 1. NAVBAR --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#070b14]/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a
            href="#home"
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-white hover:text-cyan-400 transition-colors"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-black font-black text-sm">
              SP
            </span>
            <span>Samriddhi Pandey</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {SECTIONS.map((sec) => (
              <button
                key={sec}
                onClick={() => scrollToSection(sec)}
                className={`text-sm font-medium tracking-wide transition-colors capitalize ${
                  activeSection === sec ? "text-cyan-400 font-semibold" : "text-slate-400 hover:text-white"
                }`}
              >
                {sec}
              </button>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href="https://drive.google.com/file/d/13rSRlsooGJYXNLvxA-yt9VbOyK-P4656/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full text-sm font-semibold border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/10 transition-all"
            >
              Download CV
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0a0f1d] border-b border-slate-800 px-6 py-6 space-y-4"
            >
              {SECTIONS.map((sec) => (
                <button
                  key={sec}
                  onClick={() => scrollToSection(sec)}
                  className={`block w-full text-left py-2 text-sm font-medium capitalize ${
                    activeSection === sec ? "text-cyan-400 font-semibold" : "text-slate-300"
                  }`}
                >
                  {sec}
                </button>
              ))}
               <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 text-center w-full py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-semibold text-sm"
              >
                Download CV
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
               
      {/* --- 2. HERO SECTION --- */}
      <section id="home" className="min-h-screen flex items-center justify-between px-6 md:px-20 pt-28 pb-16 max-w-7xl mx-auto">
        <div className="max-w-2xl space-y-6 z-10">
          <span className="inline-block text-xs uppercase tracking-widest text-cyan-400 font-semibold px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/30">
            AI-ML & FULL-STACK DEVELOPER
          </span>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            Hi, I am{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Samriddhi Pandey
            </span>
          </h1>

          <div className="text-2xl md:text-3xl font-medium text-slate-300 h-10 flex items-center">
            <span>{typedSubtitle}</span>
            <span className="w-1 h-7 ml-1 bg-cyan-400 animate-pulse" />
          </div>

          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            Building intelligent systems by integrating Computer Vision and LLMs with 
            modern web architectures. Focused on developing scalable, performant, and 
            user-centric applications from data pipeline to production UI.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20"
            >
              Explore Projects
            </a>
            <a
              href="#resume"
              className="px-6 py-3 rounded-xl font-medium text-slate-300 border border-slate-700 hover:border-cyan-500 hover:text-white transition-all bg-slate-900/60"
            >
              Interactive CV
            </a>
          </div>
        </div>

        <div className="hidden lg:block z-10">
          <NeuralNetworkGraphic />
        </div>
      </section>

      {/* --- 3. ABOUT SECTION --- */}
      <section id="about" className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            About <span className="text-cyan-400">Me</span>
          </h2>
          <div className="w-16 h-1 bg-cyan-400 mx-auto rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#0e1626]/80 p-8 rounded-2xl border border-slate-800 shadow-xl space-y-3">
              <h3 className="text-xl font-semibold text-cyan-300">Professional Profile</h3>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                I am a Computer Science undergraduate focused on bridging machine learning 
                models with high-performance web applications. With hands-on experience in 
                Python, C++, and modern frontend frameworks like React and Tailwind CSS, I enjoy 
                architecting end-to-end solutions that solve real-world problems.
              </p>
            </div>

            <div className="bg-[#0e1626]/80 p-8 rounded-2xl border border-slate-800 shadow-xl space-y-3">
              <h3 className="text-xl font-semibold text-purple-300">Career Objective</h3>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                Seeking software engineering and AI/ML internship opportunities where I can 
                contribute to scalable products, solve challenging computational problems, 
                and collaborate with high-performing engineering teams.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-[#0e1626]/80 p-6 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Current Standing</span>
              <p className="text-lg font-medium text-slate-200 mt-1">CSE Final Year (SSTC)</p>
            </div>

            <div className="bg-[#0e1626]/80 p-6 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Core Specialty</span>
              <p className="text-lg font-medium text-cyan-400 mt-1">AI / Computer Vision & Full-Stack</p>
            </div>

            <div className="bg-[#0e1626]/80 p-6 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Athletics</span>
              <p className="text-lg font-medium text-emerald-400 mt-1">National Table Tennis Player</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. SKILLS SECTION --- */}
      <section id="skills" className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Technical <span className="text-cyan-400">Competencies</span>
          </h2>
          <div className="w-16 h-1 bg-cyan-400 mx-auto rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILLS_DATA.map((group, idx) => (
            <div key={idx} className={`p-6 rounded-2xl bg-[#0e1626]/70 border ${group.borderColor} backdrop-blur-sm`}>
              <h3 className="text-lg font-semibold text-slate-200 mb-4">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, sIdx) => (
                  <span key={sIdx} className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${group.badgeColor}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 5. PROJECTS SECTION --- */}
      <section id="projects" className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Featured <span className="text-cyan-400">Implementations</span>
          </h2>
          <div className="w-16 h-1 bg-cyan-400 mx-auto rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS_DATA.map((proj, idx) => (
            <div key={idx} className="bg-[#0e1626]/80 p-8 rounded-2xl border border-slate-800 flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-white">{proj.title}</h3>
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{proj.description}</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-6">
                {proj.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-900 border border-slate-700 text-cyan-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 6. EXPERIENCE SECTION --- */}
      <section id="experience" className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Professional <span className="text-cyan-400">Engineering</span>
          </h2>
          <div className="w-16 h-1 bg-cyan-400 mx-auto rounded-full mt-3" />
        </div>

        <div className="max-w-3xl mx-auto bg-[#0e1626]/80 p-8 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h3 className="text-xl font-bold text-white">Web Development Intern</h3>
              <p className="text-cyan-400 font-medium text-sm">Indian Institute of Technology (IIT), Guwahati</p>
            </div>
            <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 mt-2 sm:mt-0 font-semibold">
              July 2024 – August 2024
            </span>
          </div>

          <ul className="text-sm text-slate-300 list-disc list-inside space-y-2 pt-2 leading-relaxed">
            <li>Built and prototyped responsive user interfaces for academic and research departmental modules.</li>
            <li>Optimized client-side rendering performance and enhanced accessibility across multi-device views.</li>
            <li>Collaborated closely with research scholars to translate structured backend data into clean frontend representations.</li>
          </ul>
        </div>
      </section>

      {/* --- 7. EDUCATION SECTION --- */}
      <section id="education" className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Academic <span className="text-cyan-400">Training</span>
          </h2>
          <div className="w-16 h-1 bg-cyan-400 mx-auto rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EDUCATION_DATA.map((edu, idx) => (
            <div key={idx} className="bg-[#0e1626]/80 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-cyan-400">{edu.period}</span>
                <h3 className="text-base font-bold text-white mt-1">{edu.degree}</h3>
                <p className="text-slate-400 text-xs mt-1">{edu.institution}</p>
              </div>
              <p className="text-sm font-semibold text-slate-200 mt-4 pt-3 border-t border-slate-800">{edu.grade}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- 8. CERTIFICATIONS SECTION --- */}
      <section id="certifications" className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Professional <span className="text-cyan-400">Certifications</span>
          </h2>
          <div className="w-16 h-1 bg-cyan-400 mx-auto rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, idx) => (
            <div key={idx} className="bg-[#0e1626]/80 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-cyan-400">{cert.date}</span>
                <h3 className="text-base font-bold text-white mt-1">{cert.title}</h3>
                <p className="text-slate-400 text-xs mt-1">{cert.issuer}</p>
              </div>
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 pt-3 border-t border-slate-800 text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
              >
                <span>Verify Certificate</span>
                <span>→</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* --- 9. CURRICULUM VITAE / RESUME SECTION --- */}
      <section id="resume" className="py-24 px-6 md:px-20 bg-[#070b14]/50 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-2">
              Curriculum <span className="text-cyan-400">Vitae</span>
            </h2>
            <div className="w-16 h-1 bg-cyan-400 mx-auto rounded-full mt-3" />
          </div>

          <p className="text-slate-400 max-w-xl mx-auto text-base">
            Click below to view my complete verified academic background, technical competencies, and engineering experience.
          </p>

          <div className="bg-[#0e1626] border border-slate-800 rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-center gap-3 text-cyan-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-xl font-bold text-white">Samriddhi Pandey — Resume</span>
            </div>
            
            <p className="text-xs text-slate-400">
            </p>

            <div className="flex justify-center gap-4 flex-wrap pt-2">
              <a
                href="https://drive.google.com/file/d/13rSRlsooGJYXNLvxA-yt9VbOyK-P4656/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all text-sm flex items-center gap-2"
              >
                <span>Open in New Tab</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>

              <a
                href="/resume.pdf"
                download="Samriddhi_Pandey_Resume.pdf"
                className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 transition-all text-sm flex items-center gap-2"
              >
                <span>Download PDF</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- 10. CONTACT SECTION --- */}
      <section id="contact" className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Initiate <span className="text-cyan-400">Contact</span>
          </h2>
          <div className="w-16 h-1 bg-cyan-400 mx-auto rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Lets build something impactful</h3>
            <p className="text-slate-400 leading-relaxed text-sm md:text-base">
              Open for software engineering internships, project collaborations, and full-stack AI/ML discussions. Reach out directly!
            </p>

            <div className="space-y-4 pt-4">
              <div className="p-4 rounded-xl bg-[#0e1626]/80 border border-slate-800">
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Direct Email</span>
                <p className="text-sm font-semibold text-cyan-400 mt-1">psamriddhi355@gmail.com</p>
              </div>

              <div className="flex gap-4 pt-2">
                <a
                  href="https://github.com/samriddhipandey1104"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="bg-[#0e1626]/80 p-8 rounded-2xl border border-slate-800 space-y-4 shadow-xl" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs uppercase text-slate-400 font-semibold">Your Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase text-slate-400 font-semibold">Email Address</label>
                <input
                  type="email"
                  placeholder="address@domain.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs uppercase text-slate-400 font-semibold">Subject Context</label>
              <input
                type="text"
                placeholder="enter your inquiry"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs uppercase text-slate-400 font-semibold">Message Body</label>
              <textarea
                rows="4"
                placeholder="Enter message details here..."
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-95 text-white font-bold tracking-wide transition-all shadow-lg shadow-cyan-500/20 text-sm"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* --- 11. FOOTER --- */}
      <footer className="border-t border-white/10 bg-[#050816] py-8 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Samriddhi Pandey. Designed for next-generation platforms.</p>
      </footer>
    </div>
  );
}