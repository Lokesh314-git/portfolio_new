import React, { useState } from 'react';
import { FolderGit2, ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { projectsData } from '../data/projects';
import ProjectModal from '../components/projects/ProjectModal';

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800/40 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>FEATURED WORK</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            My Projects
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Explore my web development, Python automation, and AI/ML tools. Click any project to open detailed specs.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-3 rounded-full" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer p-5 rounded-2xl bg-dark-900 border border-slate-800 hover:border-cyan-500/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Project Image Box */}
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-dark-800 border border-slate-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-dark-900/90 border border-cyan-500/30 text-cyan-400 font-mono text-[10px] font-bold">
                    PROJ {project.number}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                    {project.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                  </h3>
                </div>
                <p className="font-mono text-xs text-slate-400 mb-3">{project.subtitle}</p>

                <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-dark-800 text-cyan-300 border border-slate-700/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Card Action Bar */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400 font-medium">
                  <span>View Details & Specs</span>
                  <div className="flex items-center gap-2 text-slate-400">
                    {project.github && <Github className="w-4 h-4 hover:text-white" />}
                    {project.live && <ExternalLink className="w-4 h-4 hover:text-white" />}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
