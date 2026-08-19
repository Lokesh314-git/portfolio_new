import React from 'react';
import { Code, Globe, Cpu, CheckCircle2 } from 'lucide-react';
import { skillsData } from '../data/skills';

export default function SkillsSection() {
  const iconMap = {
    Globe: Globe,
    Code: Code,
    Cpu: Cpu
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Code className="w-3.5 h-3.5" />
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Skills & Expertise
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillsData.map((category) => {
            const IconComponent = iconMap[category.icon] || Code;
            return (
              <div
                key={category.category}
                className="p-6 rounded-2xl bg-dark-800/80 border border-slate-800/80 hover:border-slate-700 transition-all shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-white">
                      {category.category}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {category.items.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center text-xs font-mono mb-1">
                          <span className="text-slate-200 font-medium">{skill.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="px-1.5 py-0.5 rounded bg-dark-900 text-cyan-400 text-[10px] border border-cyan-500/20">
                              {skill.tag}
                            </span>
                            <span className="text-slate-400 font-bold">{skill.level}%</span>
                          </div>
                        </div>
                        <div className="w-full h-2 bg-dark-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs font-mono text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Hands-on implementation ready</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
