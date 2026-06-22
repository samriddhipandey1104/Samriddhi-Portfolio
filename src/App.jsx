import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CUSTOM SVG ICONS ---
const Icons = {
  Brain: () => (
    <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.991l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Code: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  Github: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
    </svg>
  ),
  ExternalLink: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  ),
  Mail: () => (
    <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Linkedin: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
    </svg>
  ),
  Menu: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  Close: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
};

// --- DATA STRUCTURES ---
const SKILLS = [
  { name: 'C++', category: 'Languages', level: 90 },
  { name: 'Python', category: 'Languages', level: 95 },
  { name: 'DSA', category: 'Fundamentals', level: 88 },
  { name: 'HTML & CSS', category: 'Frontend', level: 90 },
  { name: 'JavaScript', category: 'Languages', level: 85 },
  { name: 'React', category: 'Frontend', level: 80 },
  { name: 'AI/ML (PyTorch/Scikit)', category: 'Core AI', level: 85 },
  { name: 'Cloud Computing (AWS/GCP)', category: 'Core AI', level: 75 }
];

const PROJECTS = [
  {
    title: 'Data-Driven Exploratory Analyzer',
    description: 'Engineered an automated Python script to preprocess raw CSV datasets, handling missing values, and generating comprehensive data profiling reports.',
    tech: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
    github: 'https://github.com/samriddhipandey',
    live: '#'
  },
  {
    title: 'NeuralVision Interface Architecture',
    description: 'Designed a clean, glassmorphic portfolio landing page featuring scroll-triggered animation flows using Framer Motion.',
    tech: ['React.js', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/samriddhipandey',
    live: '#'
  }
];

const EXPERIENCES = [
  {
    role: 'Web Development Intern',
    company: 'Indian Institute of Technology (IIT), Guwahati',
    period: 'July 2024 – August 2024',
    details: 'Assisted in developing and prototyping responsive user interfaces for academic modules. Refined client-side components to optimize page rendering speeds and collaborated with research teams to integrate backend representations.'
  }
];

const EDUCATION = [
  {
    degree: 'B.Tech in Computer Science & Engineering (Artificial Intelligence)',
    institution: 'Shri Shankaracharya Technical Campus, Bhilai',
    period: 'Graduation: 2023-2027',
    grade: 'CGPA: 7.55',
  },
  {
    degree: 'Higher Secondary Certificate (Class XII)',
    institution: 'St. Peters Convent School',
    period: '2022 – 2023',
    grade: 'Score: 70.2%',
  },
  {
    degree: 'High School Certificate (Class X)',
    institution: 'St. Peters Convent School',
    period: '2020 – 2021',
    grade: 'Score: 86%',
  }
];

const CERTIFICATIONS = [
  {
    title: 'Data Science with Python Specialization',
    issuer: 'Techonet Automation',
    date: '2025',
    credentialUrl: '#'
  },
  {
    title: 'C & C++ Programming Certification',
    issuer: 'Sensible Academy',
    date: '2024',
    credentialUrl: '#'
  }
];

// --- PLACEHOLDER GOOGLE DRIVE CV URL (CHANGE THIS TO YOUR ACTUAL GOOGLE DRIVE LINK) ---
const GOOGLE_DRIVE_CV_URL = "https://docs.google.com/document/d/1SACCS0GuzAdtHmiKUKZJzwFkj05-BqGrV-ELo8fzvTI/edit?usp=sharing"
// --- FLOATING PARTICLES BACKGROUND ---
const ParticlesBackground = () => {
  const particles = Array.from({ length: 25 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((_, i) => {
        const size = Math.random() * 6 + 2;
        const color = Math.random() > 0.5 ? 'rgba(6, 182, 212, 0.3)' : 'rgba(168, 85, 247, 0.3)';
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(1px)'
            }}
            animate={{
              y: [0, Math.random() * -100 - 50, 0],
              x: [0, (Math.random() - 0.5) * 80, 0],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
      })}
    </div>
  );
};

// --- TYPEWRITER EFFECT HOOK ---
const useTypewriter = (words, speed = 100, delay = 2000) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const word = words[currentWordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(word.substring(0, currentText.length - 1));
      }, speed / 2);
    } else {
      timer = setTimeout(() => {
        setCurrentText(word.substring(0, currentText.length + 1));
      }, speed);
    }

    if (!isDeleting && currentText === word) {
      timer = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, speed, delay]);

  return currentText;
};

// --- ANIMATED AI NETWORK GRAPHIC ---
const NeuralNetworkGraphic = () => {
  const nodes = [
    { x: 100, y: 100, delay: 0 },
    { x: 300, y: 80, delay: 0.5 },
    { x: 200, y: 200, delay: 1.0 },
    { x: 400, y: 180, delay: 0.2 },
    { x: 150, y: 320, delay: 0.8 },
    { x: 350, y: 300, delay: 1.2 },
    { x: 250, y: 400, delay: 0.4 },
    { x: 450, y: 380, delay: 0.9 }
  ];

  return (
    <div className="w-full h-[400px] flex items-center justify-center relative">
      <svg viewBox="0 0 500 450" className="w-full h-full max-w-[450px]">
        {nodes.map((node, i) =>
          nodes.slice(i + 1).map((target, j) => {
            if ((i + j) % 3 === 0) {
              return (
                <line
                  key={`${i}-${j}`}
                  x1={node.x}
                  y1={node.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="url(#lineGradient)"
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                />
              );
            }
            return null;
          })
        )}

        {nodes.map((node, i) => (
          <g key={i}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="7"
              fill={i % 2 === 0 ? "#00f2fe" : "#a855f7"}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: node.delay,
                ease: "easeInOut"
              }}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r="15"
              fill="none"
              stroke={i % 2 === 0 ? "#00f2fe" : "#a855f7"}
              strokeWidth="1"
              opacity="0.2"
            />
          </g>
        ))}

        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f2fe" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// --- GLOBAL STATIC CONFIG ---
const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'certifications', 'contact'];

// --- COMPONENT IMPLEMENTATION ---
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const typedSubtitle = useTypewriter(['Aspiring AI Engineer', 'Software Developer', 'Deep Learning Enthusiast'], 120, 2500);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      sections.forEach((sec) => {
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden relative">
      <ParticlesBackground />

      {/* 1. NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#050816]/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <Icons.Brain />
            <span className="font-extrabold text-lg sm:text-xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 whitespace-nowrap">
              Samriddhi Pandey
            </span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8">
            {sections.map((sec) => (
              <button
                key={sec}
                onClick={() => scrollToSection(sec)}
                className={`text-sm font-medium tracking-wide transition-colors capitalize ${
                  activeSection === sec ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                {sec}
              </button>
            ))}
          </nav>

          <div className="hidden md:block">
            <a 
              href={GOOGLE_DRIVE_CV_URL} 
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full text-sm font-semibold border border-cyan-400/40 hover:bg-cyan-500/10 transition duration-300 text-cyan-400"
            >
              Download CV
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-100">
              {mobileMenuOpen ? <Icons.Close /> : <Icons.Menu />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#050816]/95 border-b border-white/10 px-6 py-4 flex flex-col gap-4"
            >
              {sections.map((sec) => (
                <button
                  key={sec}
                  onClick={() => scrollToSection(sec)}
                  className={`text-left text-base font-semibold capitalize py-2 ${
                    activeSection === sec ? 'text-cyan-400' : 'text-slate-400'
                  }`}
                >
                  {sec}
                </button>
              ))}
              <a 
                href={GOOGLE_DRIVE_CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-center w-full py-3 rounded-lg border border-cyan-400/40 text-cyan-400 font-semibold"
              >
                Download CV
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. HERO SECTION */}
      <section id="home" className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-6">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col space-y-6"
          >
            <span className="text-cyan-400 text-lg font-mono tracking-widest uppercase">
              Systems Architect & Deep Learning Enthusiast
            </span>
            <h1 className="text-4xl sm:text-6xl font-black leading-tight text-white">
              Hi, I am{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                Samriddhi Pandey
              </span>
            </h1>
            <div className="h-10 text-xl sm:text-2xl font-semibold text-slate-300">
              <span>{typedSubtitle}</span>
              <span className="animate-pulse text-cyan-400">|</span>
            </div>
            <p className="text-slate-400 max-w-lg text-base sm:text-lg leading-relaxed">
              Engineering deterministic solutions within abstract neural architectures. Specialized in modern AI deployments, computational pipelines, and interface architectures.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-95 text-white font-semibold shadow-lg shadow-cyan-500/20 transition-all duration-300"
              >
                Explore Projects
              </button>
              <a 
                href={GOOGLE_DRIVE_CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-lg bg-white/5 border border-white/15 hover:border-cyan-400/50 hover:bg-white/10 text-slate-100 font-semibold transition-all duration-300 text-center"
              >
                Interactive CV
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full filter blur-3xl opacity-50" />
            <NeuralNetworkGraphic />
          </motion.div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="py-24 px-6 relative bg-gradient-to-b from-[#050816] via-[#090b24]/40 to-[#050816]">
        <div className="max-w-5xl mx-auto z-10 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-wide">About Me</h2>
            <div className="w-16 h-1 bg-cyan-400 mx-auto rounded-full" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="md:col-span-2 space-y-6">
              <h3 className="text-2xl font-bold text-white">Professional Profile</h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                I am an aspiring AI Engineer focused on developing robust, contextual learning algorithms alongside responsive application structures. With a firm academic background in computer science, I balance high-performance backend engineering in C++ and Python with modern frontend design elements using Tailwind CSS and React.
              </p>
              <h3 className="text-2xl font-bold text-white pt-2">Career Objective</h3>
              <p className="text-slate-300 leading-relaxed">
                Aiming to integrate into highly dynamic product teams focused on deep learning paradigms, high-throughput systems design, and scalable client-facing solutions.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex flex-col justify-center space-y-6">
              <div className="border-l-4 border-cyan-400 pl-4">
                <p className="text-sm text-slate-400">Current Standing</p>
                <p className="font-bold text-slate-100 text-lg">CSE Junior (SSTC)</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="text-sm text-slate-400">Core Specialty</p>
                <p className="font-bold text-slate-100 text-lg">AI / Web Development</p>
              </div>
              <div className="border-l-4 border-cyan-400 pl-4">
                <p className="text-sm text-slate-400">Athletics</p>
                <p className="font-bold text-slate-100 text-lg">National Table Tennis Player</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. SKILLS SECTION */}
      <section id="skills" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-wide">Technical Competencies</h2>
            <div className="w-16 h-1 bg-purple-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILLS.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5, borderColor: 'rgba(6, 182, 212, 0.4)' }}
                className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 transition-all duration-300 group"
              >
                <span className="text-xs font-mono tracking-widest text-cyan-400 block mb-2">{skill.category}</span>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">{skill.name}</h3>
                
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full rounded-full"
                  />
                </div>
                <span className="text-xs text-slate-400 mt-2 block text-right font-mono">{skill.level}% Proficient</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROJECTS SECTION */}
      <section id="projects" className="py-24 px-6 bg-[#050816]/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-wide">Featured Implementations</h2>
            <div className="w-16 h-1 bg-cyan-400 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {PROJECTS.map((proj, index) => (
              <motion.div
                key={proj.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="mb-4">
                  <div className="flex justify-between items-start">
                    <Icons.Code />
                    <div className="flex gap-3">
                      <a href={proj.github} className="text-slate-400 hover:text-cyan-400 transition-colors">
                        <Icons.Github />
                      </a>
                      <a href={proj.live} className="text-slate-400 hover:text-cyan-400 transition-colors">
                        <Icons.ExternalLink />
                      </a>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {proj.tech.map((t) => (
                    <span key={t} className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 border border-white/10 text-cyan-300">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. EXPERIENCE TIMELINE SECTION */}
      <section id="experience" className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-wide">Professional Engineering</h2>
            <div className="w-16 h-1 bg-purple-500 mx-auto rounded-full" />
          </div>

          <div className="relative border-l-2 border-white/10 pl-6 sm:pl-10 ml-4 space-y-12">
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="absolute -left-[35px] sm:-left-[51px] top-1 w-6 h-6 rounded-full bg-[#050816] border-4 border-cyan-400 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <p className="text-sm text-cyan-400 font-semibold">{exp.company}</p>
                    </div>
                    <span className="text-sm font-mono text-purple-400 mt-2 sm:mt-0">{exp.period}</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{exp.details}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. EDUCATION SECTION */}
      <section id="education" className="py-24 px-6 bg-[#050816]/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-wide">Academic Training</h2>
            <div className="w-16 h-1 bg-cyan-400 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EDUCATION.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 relative group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-tr-2xl" />
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">{edu.period}</span>
                <h3 className="text-xl font-bold text-white mt-2 mb-1 group-hover:text-cyan-400 transition-colors">{edu.degree}</h3>
                <p className="text-slate-300 font-medium mb-4">{edu.institution}</p>
                <div className="inline-block bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm font-semibold text-purple-300">
                  {edu.grade}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7.5 CERTIFICATIONS SECTION */}
      <section id="certifications" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-wide">Professional Certifications</h2>
            <div className="w-16 h-1 bg-purple-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {CERTIFICATIONS.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, borderColor: 'rgba(6, 182, 212, 0.4)' }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-tr-2xl" />
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">{cert.date}</span>
                <h3 className="text-xl font-bold text-white mt-2 mb-1 group-hover:text-cyan-400 transition-colors">{cert.title}</h3>
                <p className="text-slate-300 font-medium mb-4">{cert.issuer}</p>
                <div className="mt-4">
                  <a 
                    href={cert.credentialUrl}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 text-sm font-semibold text-purple-300 hover:text-cyan-400 transition-colors"
                  >
                    Verify Certificate <Icons.ExternalLink />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CONTACT SECTION */}
      <section id="contact" className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto z-10 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-wide">Initiate Contact</h2>
            <div className="w-16 h-1 bg-purple-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Communication details */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 flex flex-col space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Lets build something deterministic</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Open for internship opportunities, project collaborations, and discussion of algorithmic design. Submit a transmission or reach out directly.
                </p>
              </div>

              <div className="space-y-4">
                <a 
                  href="mailto:psamriddhi355@gmail.com"
                  className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300 cursor-pointer w-full"
                >
                  <Icons.Mail />
                  <div>
                    <p className="text-xs text-slate-400 font-mono">DIRECT MAIL</p>
                    <p className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors">psamriddhi355@gmail.com</p>
                  </div>
                </a>
              </div>

              <div className="flex gap-4">
                <a 
                  href="https://github.com/samriddhipandey" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3.5 bg-white/5 border border-white/10 hover:border-cyan-400 hover:bg-cyan-500/10 rounded-xl transition duration-300 text-slate-100"
                >
                  <Icons.Github />
                </a>
                <a 
                  href="https://linkedin.com/in/samriddhipandey" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3.5 bg-white/5 border border-white/10 hover:border-cyan-400 hover:bg-cyan-500/10 rounded-xl transition duration-300 text-slate-100"
                >
                  <Icons.Linkedin />
                </a>
              </div>
            </motion.div>

            {/* Structured Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10"
            >
              <form 
                action="https://formspree.io/f/xjgqbogz" 
                method="POST" 
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">Your Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      required
                      className="w-full bg-[#050816]/75 border border-white/15 focus:border-cyan-400/80 rounded-lg py-3 px-4 text-slate-200 focus:outline-none transition-all" 
                      placeholder="Samriddhi Pandey"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      required
                      className="w-full bg-[#050816]/75 border border-white/15 focus:border-cyan-400/80 rounded-lg py-3 px-4 text-slate-200 focus:outline-none transition-all" 
                      placeholder="address@domain.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">Transmission Context</label>
                  <input 
                    type="text" 
                    name="subject" 
                    required
                    className="w-full bg-[#050816]/75 border border-white/15 focus:border-cyan-400/80 rounded-lg py-3 px-4 text-slate-200 focus:outline-none transition-all" 
                    placeholder="Subject context"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">Message Body</label>
                  <textarea 
                    rows="5" 
                    name="message" 
                    required
                    className="w-full bg-[#050816]/75 border border-white/15 focus:border-cyan-400/80 rounded-lg py-3 px-4 text-slate-200 focus:outline-none transition-all" 
                    placeholder="Enter message details here..."
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-95 text-white font-bold tracking-wide shadow-md transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#050816] py-8 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Samriddhi Pandey. Designed for next-generation platforms.</p>
      </footer>
    </div>
  );
}