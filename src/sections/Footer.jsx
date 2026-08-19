import React from 'react';
import { Terminal, Linkedin, Twitter, Facebook, ArrowUp } from 'lucide-react';
import { personalData } from '../data/personal';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-950 border-t border-slate-800/80 py-12 px-4 sm:px-6 lg:px-8 text-slate-400 text-xs font-mono relative">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-6">
        {/* Logo */}
        <div className="flex items-center gap-2 text-white font-display font-bold text-lg">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <span>{personalData.name}</span>
          <span className="text-cyan-400 text-xs font-mono font-normal">| WEB DEV × AI/ML</span>
        </div>

        {/* Links */}
        <ul className="flex flex-wrap items-center justify-center gap-6 text-slate-300 font-sans text-sm">
          <li><a href="#home" className="hover:text-cyan-400 transition-colors">Home</a></li>
          <li><a href="#about" className="hover:text-cyan-400 transition-colors">About</a></li>
          <li><a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a></li>
          <li><a href="#certificates" className="hover:text-cyan-400 transition-colors">Certificates</a></li>
          <li><a href="#timeline" className="hover:text-cyan-400 transition-colors">Timeline</a></li>
          <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a></li>
        </ul>

        {/* Social Share Icons */}
        <div className="flex items-center gap-3">
          <a
            href={personalData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-dark-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=https://lokesh314-git.github.io/portfolio_new/&text=Check out ${personalData.name}'s Portfolio`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-dark-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all"
            aria-label="Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href="https://www.facebook.com/sharer/sharer.php?u=https://lokesh314-git.github.io/portfolio_new/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-dark-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all"
            aria-label="Facebook"
          >
            <Facebook className="w-4 h-4" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-slate-500 max-w-md">
          © {currentYear} {personalData.name}. All rights reserved. | Takshashila University • Chennai, India
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-full bg-dark-800 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition-all"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}
