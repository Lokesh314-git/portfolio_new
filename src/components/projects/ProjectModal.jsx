import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Code2 } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-dark-900/90 backdrop-blur-xl animate-modal"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-dark-800 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-dark-900/80 text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700 transition-all z-10"
          aria-label="Close Project Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Project Header Banner */}
        <div className="relative rounded-xl overflow-hidden mb-6 aspect-video bg-dark-900 border border-slate-800">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent flex items-end p-6">
            <div>
              <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider bg-cyan-950/80 px-2.5 py-1 rounded-md border border-cyan-500/30">
                PROJECT {project.number}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-2">
                {project.title}
              </h2>
              <p className="text-sm font-mono text-slate-300">{project.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-cyan-400" /> Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Overview
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h3 className="text-sm font-mono font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Key Features & Highlights
              </h3>
              <ul className="space-y-2 text-sm text-slate-300">
                {project.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Links */}
          <div className="pt-4 border-t border-slate-700/60 flex flex-wrap items-center gap-4">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-neon-cyan transition-all"
              >
                <span>Live Project / Launch</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-dark-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-semibold text-sm transition-all"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
