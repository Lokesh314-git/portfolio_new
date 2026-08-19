import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, GraduationCap, MapPin, ExternalLink, Sparkles, CheckCircle2, Award, Mail } from 'lucide-react';
import { personalData } from '../../data/personal';
import { skillsData } from '../../data/skills';
import { experienceData } from '../../data/experience';
import { projectsData } from '../../data/projects';
import { certificatesData } from '../../data/certificates';

export default function BookOverlay({ isOpen, onClose }) {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [flipAnimation, setFlipAnimation] = useState(null); // 'next' | 'prev' | null

  const spreads = [
    // SPREAD 0: Cover / Dossier Intro & Bio Overview
    {
      tabLabel: "Overview",
      leftPage: {
        title: "OFFICIAL DEVELOPER DOSSIER",
        pageNum: 1,
        content: (
          <div className="flex flex-col items-center justify-between h-full text-center py-2 space-y-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-blue-600/10 to-transparent border-2 border-cyan-400/50 flex items-center justify-center text-cyan-400 shadow-neu-glow">
                <BookOpen className="w-12 h-12" />
              </div>
              <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-cyan-500 text-black font-mono font-bold text-[9px] uppercase tracking-wider shadow">
                VERIFIED
              </span>
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-[10px] font-bold uppercase tracking-widest mb-2">
                2026 PHYSICAL EDITION
              </span>
              <h2 className="font-display text-3xl font-extrabold text-white tracking-wide">{personalData.name}</h2>
              <p className="font-mono text-xs text-cyan-400 font-bold mt-1 tracking-wider uppercase">{personalData.title}</p>
            </div>

            <div className="w-full space-y-2 text-left font-mono text-xs text-slate-300 p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-neu-flat">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="truncate">Takshashila University (B.Sc. CS)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Chennai / Tindivanam, India</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <Sparkles className="w-4 h-4 shrink-0 animate-pulse" />
                <span>Status: Available for Hire</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic font-sans leading-relaxed px-2">
              "Turn the pages of this physical dossier to review my academic journey, skill matrices, software projects, and Microsoft credentials."
            </p>
          </div>
        )
      },
      rightPage: {
        title: "BIOGRAPHY & SUMMARY",
        pageNum: 2,
        content: (
          <div className="space-y-4 text-slate-300 text-xs sm:text-sm leading-relaxed">
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-neu-flat">
              <h4 className="font-display font-bold text-white text-sm mb-1 text-cyan-400">Executive Summary</h4>
              <p className="text-xs text-slate-300">
                Passionate computer science student specializing in frontend web application development, machine learning algorithms, and intelligent software automation systems.
              </p>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300">
              {personalData.bioParagraphs.map((para, i) => (
                <p key={i} className="leading-relaxed bg-slate-900/40 p-2.5 rounded-lg border border-slate-800">
                  {para}
                </p>
              ))}
            </div>

            {/* Quick Index Links */}
            <div className="pt-2">
              <h5 className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Dossier Index</h5>
              <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
                <span className="p-1.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">P03-04 • Skills</span>
                <span className="p-1.5 rounded bg-slate-800 text-purple-400 border border-slate-700">P05-06 • Milestones</span>
                <span className="p-1.5 rounded bg-slate-800 text-sky-400 border border-slate-700">P07-08 • Certs</span>
                <span className="p-1.5 rounded bg-slate-800 text-orange-400 border border-slate-700">P09-10 • Contact</span>
              </div>
            </div>
          </div>
        )
      }
    },
    // SPREAD 1: Academics & Technical Skill Matrix
    {
      tabLabel: "Skills & Bio",
      leftPage: {
        title: "ACADEMIC PROFILE",
        pageNum: 3,
        content: (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 shadow-neu-flat">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <h4 className="font-display font-bold text-white text-sm">B.Sc. Computer Science</h4>
              </div>
              <p className="text-xs font-mono text-cyan-300 mb-2">Takshashila University • 2024–2027</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Core coursework focusing on Data Structures & Algorithms, Object-Oriented Programming, Database Management (SQL), Web Technologies, and Machine Learning Fundamentals.
              </p>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <h4 className="font-bold text-slate-300 text-[11px] uppercase tracking-wider mb-1">Key Domain Specializations</h4>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Full-Stack Web Development (React, Vite, Node)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>AI/ML Algorithms & Python Data Science</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Interactive 3D Graphics (Three.js / WebGL)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Database Systems & Automation Scripts</span>
                </div>
              </div>
            </div>
          </div>
        )
      },
      rightPage: {
        title: "TECHNICAL SKILLS MATRIX",
        pageNum: 4,
        content: (
          <div className="space-y-3.5">
            {skillsData.map((cat) => (
              <div key={cat.category} className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-neu-flat">
                <h4 className="font-mono text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-2">
                  {cat.category}
                </h4>
                <div className="space-y-2">
                  {cat.items.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-0.5">
                        <span>{skill.name}</span>
                        <span className="text-cyan-400 font-bold">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-neon-cyan"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
      }
    },
    // SPREAD 2: Chronology & Projects Showcase
    {
      tabLabel: "Milestones & Projects",
      leftPage: {
        title: "EXPERIENCE & MILESTONES",
        pageNum: 5,
        content: (
          <div className="space-y-2.5">
            {experienceData.map((item, index) => (
              <div key={index} className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs shadow-neu-flat">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-purple-400 font-bold text-[11px]">{item.year}</span>
                  <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30 text-[9px] font-mono font-semibold">
                    {item.badge}
                  </span>
                </div>
                <h4 className="font-semibold text-white text-xs">{item.title}</h4>
                <p className="text-slate-400 font-mono text-[10px] mb-1">{item.institution}</p>
                <p className="text-slate-300 text-[11px] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        )
      },
      rightPage: {
        title: "FEATURED PROJECTS",
        pageNum: 6,
        content: (
          <div className="grid grid-cols-1 gap-2.5">
            {projectsData.map((proj) => (
              <div key={proj.id} className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 flex flex-col justify-between shadow-neu-flat">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] text-cyan-400 font-bold uppercase">PROJECT {proj.number}</span>
                    <span className="text-[9px] font-mono text-slate-400">{proj.category}</span>
                  </div>
                  <h4 className="font-semibold text-white text-xs mt-0.5">{proj.title}</h4>
                  <p className="text-[11px] text-slate-300 line-clamp-2 mt-1 leading-snug">{proj.description}</p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-1 mt-2.5 pt-2 border-t border-slate-800">
                  <div className="flex flex-wrap gap-1">
                    {proj.technologies.slice(0, 3).map(t => (
                      <span key={t} className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <span>Code</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      }
    },
    // SPREAD 3: Certificates & Contact Station
    {
      tabLabel: "Certs & Contact",
      leftPage: {
        title: "MICROSOFT & CREDENTIALS",
        pageNum: 7,
        content: (
          <div className="space-y-3">
            {certificatesData.map((cert) => (
              <div key={cert.id} className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 flex gap-3 items-center shadow-neu-flat">
                <img src={cert.image} alt={cert.title} className="w-14 h-14 object-cover rounded-lg border border-slate-700 shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-500/30 text-[9px] font-mono font-bold">
                    VERIFIED CERTIFICATE
                  </span>
                  <h4 className="font-semibold text-white text-xs leading-tight mt-1">{cert.title}</h4>
                  <p className="text-[10px] font-mono text-sky-400 mt-0.5">{cert.issuer} • {cert.year}</p>
                </div>
              </div>
            ))}

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-center font-mono text-xs text-slate-400">
              <Award className="w-6 h-6 text-sky-400 mx-auto mb-1" />
              <p className="text-[11px]">Continuous skill acquisition in progress with Microsoft and industry certification tracks.</p>
            </div>
          </div>
        )
      },
      rightPage: {
        title: "CONTACT DOSSIER STATION",
        pageNum: 8,
        content: (
          <div className="flex flex-col items-center justify-between h-full py-2 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-400/40 flex items-center justify-center text-orange-400 shadow-neu-flat">
              <Mail className="w-7 h-7" />
            </div>

            <div>
              <h3 className="font-display font-bold text-xl text-white">Let's Connect & Collaborate</h3>
              <p className="text-xs text-slate-300 max-w-xs mt-1 leading-relaxed">
                Open for full-time opportunities, freelance web development, and AI/ML project collaborations.
              </p>
            </div>

            <div className="w-full space-y-2 font-mono text-xs">
              <a
                href={`mailto:${personalData.email}`}
                className="block p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-orange-500/40 text-orange-400 font-semibold transition-all shadow-neu-flat text-left px-4"
              >
                <div className="text-[9px] text-slate-400 font-normal">EMAIL ADDRESS</div>
                <div className="truncate">{personalData.email}</div>
              </a>

              <a
                href={`tel:${personalData.phone}`}
                className="block p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-all shadow-neu-flat text-left px-4"
              >
                <div className="text-[9px] text-slate-400 font-normal">PHONE NUMBER</div>
                <div>{personalData.phone}</div>
              </a>
            </div>

            <div className="w-full pt-2">
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono font-bold text-xs shadow-neon-cyan transition-all"
              >
                CLOSE DOSSIER BOOK
              </button>
            </div>
          </div>
        )
      }
    }
  ];

  const handleSpreadTurn = (targetSpread, direction) => {
    if (targetSpread < 0 || targetSpread >= spreads.length || flipAnimation) return;
    setFlipAnimation(direction);
    
    setTimeout(() => {
      setCurrentSpread(targetSpread);
    }, 220);

    setTimeout(() => {
      setFlipAnimation(null);
    }, 450);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleSpreadTurn(currentSpread + 1, 'next');
      if (e.key === 'ArrowLeft') handleSpreadTurn(currentSpread - 1, 'prev');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, currentSpread, flipAnimation]);

  if (!isOpen) return null;

  const current = spreads[currentSpread];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/90 backdrop-blur-2xl animate-modal overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      {/* 1. REALISTIC HARDCOVER LEATHER BINDER MANTLE CONTAINER */}
      <div className="relative w-full max-w-5xl h-[88vh] bg-[#0c1322] border-4 border-slate-700/80 rounded-[2.5rem] shadow-[0_35px_80px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden p-2 sm:p-3">
        
        {/* BRASS / CYAN CORNER PROTECTOR GUARDS */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-cyan-400/80 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-cyan-400/80 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-cyan-400/80 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-cyan-400/80 rounded-br-lg pointer-events-none" />

        {/* TOP HEADER CONTROLS & TAB SELECTOR */}
        <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-900/90 rounded-2xl border border-slate-800 mb-2 z-30 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold font-mono text-xs">
              📖
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-sm sm:text-base leading-tight">
                LOKESH A • PORTFOLIO DOSSIER
              </h3>
              <p className="font-mono text-[10px] text-cyan-400 tracking-wider">
                PHYSICAL 3D OPEN BOOK SPREAD
              </p>
            </div>
          </div>

          {/* SPREAD TABS */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {spreads.map((sp, idx) => (
              <button
                key={idx}
                onClick={() => handleSpreadTurn(idx, idx > currentSpread ? 'next' : 'prev')}
                className={`px-3 py-1 rounded-lg text-[10px] font-mono font-semibold transition-all ${
                  currentSpread === idx
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-neu-glow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {sp.tabLabel}
              </button>
            ))}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 transition-colors"
            aria-label="Close Dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. OPEN BOOK TWO-PAGE SPREAD BODY */}
        <div className="relative flex-1 grid grid-cols-1 md:grid-cols-2 gap-0.5 overflow-hidden rounded-2xl bg-slate-950 shadow-inner">
          
          {/* CENTRAL SPINE SPINE SHADOW & SATIN RIBBON BOOKMARK */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 bg-gradient-to-r from-black/70 via-slate-950/90 to-black/70 pointer-events-none z-30 hidden md:block border-x border-slate-800/40" />
          
          {/* Cyan Satin Ribbon Bookmark */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3.5 h-[105%] bg-gradient-to-b from-cyan-400 via-cyan-500 to-blue-600 shadow-2xl rounded-b-md z-40 pointer-events-none hidden md:block border-x border-cyan-300/40 opacity-90" />

          {/* LEFT PAGE (PAGE N) */}
          <div
            className={`relative flex flex-col h-full bg-[#0f172a] p-4 sm:p-5 overflow-hidden border-r border-slate-800/80 shadow-[inset_-24px_0_35px_-12px_rgba(0,0,0,0.85)] transition-all ${
              flipAnimation === 'prev' ? 'animate-page-flip-prev' : ''
            }`}
          >
            {/* Left Page Top Bar */}
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800/80 font-mono text-[10px] text-slate-400 uppercase tracking-widest shrink-0">
              <span className="font-bold text-cyan-400">{current.leftPage.title}</span>
              <span>PARCHMENT P.0{current.leftPage.pageNum}</span>
            </div>

            {/* Left Page Scrollable Content */}
            <div className="flex-1 overflow-y-auto pr-1">
              {current.leftPage.content}
            </div>

            {/* Left Page Bottom Footer */}
            <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-800/80 font-mono text-[10px] text-slate-400 shrink-0">
              <span>— PAGE 0{current.leftPage.pageNum} —</span>
              {currentSpread > 0 && (
                <button
                  onClick={() => handleSpreadTurn(currentSpread - 1, 'prev')}
                  className="flex items-center gap-1 text-cyan-400 hover:underline font-bold"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>PREV SPREAD</span>
                </button>
              )}
            </div>
          </div>

          {/* RIGHT PAGE (PAGE N+1) */}
          <div
            className={`relative flex flex-col h-full bg-[#0f172a] p-4 sm:p-5 overflow-hidden shadow-[inset_24px_0_35px_-12px_rgba(0,0,0,0.85)] transition-all ${
              flipAnimation === 'next' ? 'animate-page-flip-next' : ''
            }`}
          >
            {/* Right Page Top Bar */}
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800/80 font-mono text-[10px] text-slate-400 uppercase tracking-widest shrink-0">
              <span>PARCHMENT P.0{current.rightPage.pageNum}</span>
              <span className="font-bold text-cyan-400">{current.rightPage.title}</span>
            </div>

            {/* Right Page Scrollable Content */}
            <div className="flex-1 overflow-y-auto pr-1">
              {current.rightPage.content}
            </div>

            {/* Right Page Bottom Footer */}
            <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-800/80 font-mono text-[10px] text-slate-400 shrink-0">
              {currentSpread < spreads.length - 1 ? (
                <button
                  onClick={() => handleSpreadTurn(currentSpread + 1, 'next')}
                  className="flex items-center gap-1 text-cyan-400 hover:underline font-bold"
                >
                  <span>NEXT SPREAD</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="text-slate-500 italic">END OF DOSSIER</span>
              )}
              <span>— PAGE 0{current.rightPage.pageNum} —</span>
            </div>
          </div>

        </div>

        {/* FOOTER CONTROL BAR */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 rounded-2xl border border-slate-800 mt-2 z-30 font-mono text-xs shrink-0">
          <button
            onClick={() => handleSpreadTurn(currentSpread - 1, 'prev')}
            disabled={currentSpread === 0 || flipAnimation !== null}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
              currentSpread === 0
                ? 'opacity-30 cursor-not-allowed text-slate-500'
                : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 shadow-neu-flat'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">PREVIOUS SPREAD</span>
          </button>

          <div className="flex items-center gap-2 text-slate-300 font-bold text-[11px] sm:text-xs">
            <span>SPREAD {currentSpread + 1} OF {spreads.length}</span>
            <span className="text-slate-500">•</span>
            <span className="text-cyan-400">P.0{current.leftPage.pageNum}-P.0{current.rightPage.pageNum}</span>
          </div>

          <button
            onClick={() => handleSpreadTurn(currentSpread + 1, 'next')}
            disabled={currentSpread === spreads.length - 1 || flipAnimation !== null}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
              currentSpread === spreads.length - 1
                ? 'opacity-30 cursor-not-allowed text-slate-500'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-neon-cyan'
            }`}
          >
            <span className="hidden sm:inline">NEXT SPREAD</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
