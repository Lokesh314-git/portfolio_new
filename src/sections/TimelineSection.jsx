import React from 'react';
import { Calendar, GraduationCap, Code2, Cpu, CheckCircle2 } from 'lucide-react';
import { experienceData } from '../data/experience';

export default function TimelineSection() {
  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800/40 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>JOURNEY & MILESTONES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Academic & Experience Timeline
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-3 rounded-full" />
        </div>

        {/* Timeline Vertical Container */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-32 space-y-12 pl-6 sm:pl-10">
          {experienceData.map((item, index) => (
            <div key={index} className="relative group">
              {/* Year Badge on the left for desktop */}
              <div className="hidden sm:block absolute -left-[165px] top-1 text-right w-28 font-mono text-xs text-cyan-400 font-bold">
                {item.year}
              </div>

              {/* Glowing Node Icon */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-dark-900 border-2 border-cyan-400 flex items-center justify-center box-glow-cyan">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
              </div>

              {/* Content Card */}
              <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 hover:border-cyan-500/40 transition-all shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="sm:hidden font-mono text-xs text-cyan-400 font-bold">
                    {item.year}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-medium">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-white mb-1">
                  {item.title}
                </h3>
                <p className="font-mono text-xs text-slate-400 mb-3">{item.institution}</p>

                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>

                {item.highlights && item.highlights.length > 0 && (
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {item.highlights.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
