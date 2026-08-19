import React from 'react';
import { User, GraduationCap, Code, Cpu, Award } from 'lucide-react';
import { personalData } from '../data/personal';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800/60 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <User className="w-3.5 h-3.5" />
            <span>BIOGRAPHY & BACKGROUND</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            About Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Profile Image & Badges */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-orange-500 rounded-3xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500" />
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-2xl bg-dark-900">
                <img
                  src={personalData.profileImage}
                  alt={personalData.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Quick Stat Pills */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-xs mt-6 font-mono text-xs">
              <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 text-center">
                <span className="block text-xl font-bold text-cyan-400">5+</span>
                <span className="text-slate-400 text-[10px]">PROJECTS BUILT</span>
              </div>
              <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 text-center">
                <span className="block text-xl font-bold text-orange-400">4</span>
                <span className="text-slate-400 text-[10px]">CERTIFICATIONS</span>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-2xl bg-dark-900/80 border border-slate-800/80 shadow-xl space-y-4">
              <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <span>Web Developer & AI/ML Student</span>
              </h3>

              <div className="p-3 rounded-xl bg-dark-800/90 border border-cyan-500/20 text-xs font-mono text-cyan-300">
                <span className="font-bold"> Takshashila University, Chennai</span> • B.Sc. Computer Science (2024–2027)
              </div>

              {personalData.bioParagraphs.map((para, index) => (
                <p key={index} className="text-slate-300 text-sm leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-dark-900 border border-slate-800">
                <Code className="w-5 h-5 text-cyan-400 mb-2" />
                <h4 className="font-bold text-white text-sm">Front-End Dev</h4>
                <p className="text-xs text-slate-400 mt-1">HTML/CSS, JS, React, Tailwind, Responsive UI.</p>
              </div>

              <div className="p-4 rounded-xl bg-dark-900 border border-slate-800">
                <Cpu className="w-5 h-5 text-orange-400 mb-2" />
                <h4 className="font-bold text-white text-sm">Python & Automation</h4>
                <p className="text-xs text-slate-400 mt-1">Scripting, Tkinter GUI, WhatsApp message automation.</p>
              </div>

              <div className="p-4 rounded-xl bg-dark-900 border border-slate-800">
                <Award className="w-5 h-5 text-indigo-400 mb-2" />
                <h4 className="font-bold text-white text-sm">AI/ML & Cloud</h4>
                <p className="text-xs text-slate-400 mt-1">Azure AI certified, machine learning models, NLP studies.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
