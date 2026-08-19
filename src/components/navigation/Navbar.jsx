import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X } from 'lucide-react';
import ModeSwitcher from './ModeSwitcher';
import { MODES } from '../../hooks/useMode';

export default function Navbar({ mode, setMode, onNavigateStation }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // In 360° Explore Mode, Navbar returns null because StudioHUD handles the unified top header
  if (mode === MODES.EXPLORE || mode?.toUpperCase() === 'EXPLORE') {
    return null;
  }

  const navLinks = [
    { label: 'About', href: '#about', stationIndex: 1 },
    { label: 'Projects', href: '#projects', stationIndex: 2 },
    { label: 'Certificates', href: '#certificates', stationIndex: 3 },
    { label: 'Timeline', href: '#timeline', stationIndex: 4 },
    { label: 'Contact', href: '#contact', stationIndex: 5 },
  ];

  const handleLinkClick = (href, stationIndex) => {
    setMobileMenuOpen(false);
    if (onNavigateStation) {
      onNavigateStation(stationIndex);
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-900/90 backdrop-blur-lg border-b border-slate-800/80 py-3 shadow-2xl'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#home', 0);
          }}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:box-glow-cyan transition-all">
            <Terminal className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg text-white tracking-wider flex items-center gap-1">
              LOKI <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            </span>
            <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">WEB DEV × AI/ML</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleLinkClick(link.href, link.stationIndex)}
                  className="hover:text-cyan-400 transition-colors py-1 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
                </button>
              </li>
            ))}
          </ul>

          <div className="h-4 w-px bg-slate-800" />

          {/* Mode Switcher */}
          <ModeSwitcher mode={mode} setMode={setMode} />
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeSwitcher mode={mode} setMode={setMode} />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg bg-dark-800 border border-slate-700/60"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark-900/95 border-b border-slate-800 backdrop-blur-xl px-4 py-6 space-y-4 animate-modal">
          <ul className="space-y-3 font-mono text-sm">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleLinkClick(link.href, link.stationIndex)}
                  className="w-full text-left py-2 px-3 text-slate-200 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-all"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
