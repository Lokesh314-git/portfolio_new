import React from 'react';
import { ArrowRight, Download, Terminal, Sparkles, MapPin, GraduationCap } from 'lucide-react';
import { personalData } from '../data/personal';
import { MODES } from '../hooks/useMode';

export default function HeroSection({ mode, setMode, onOpenBook }) {
  const isExplore = mode === MODES.EXPLORE;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-6 shadow-neon-cyan animate-pulse-slow">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>AVAILABLE FOR WEB DEV & AI/ML OPPORTUNITIES</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight mb-4 leading-[1.1]">
          Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">{personalData.name}</span>
        </h1>

        <p className="font-mono text-lg sm:text-xl text-cyan-400 font-semibold tracking-wider uppercase mb-6">
          {personalData.title}
        </p>

        {/* Summary Paragraph */}
        <p className="max-w-2xl text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
          B.Sc. Computer Science student at <span className="text-white font-medium">Takshashila University</span> in Chennai. Specializing in responsive web applications, Python automation, machine learning algorithms, and intelligent software systems.
        </p>

        {/* Key Quick Tags */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 mb-10">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-800 border border-slate-700">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span>Takshashila CS (2024-2027)</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-800 border border-slate-700">
            <MapPin className="w-4 h-4 text-orange-400" />
            <span>Chennai, TN, India</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-neon-cyan transition-all transform hover:-translate-y-0.5"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={() => setMode(isExplore ? MODES.QUICK : MODES.EXPLORE)}
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-dark-800 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-sm transition-all"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Switch to {isExplore ? 'Quick Recruiter View' : '3D Explore Workspace'}</span>
          </button>

          <a
            href="#contact"
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-dark-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-medium text-sm transition-all"
          >
            <Download className="w-4 h-4 text-orange-400" />
            <span>Resume & Contact</span>
          </a>
        </div>
      </div>
    </section>
  );
}
