import React from 'react';
import { Sparkles, Zap } from 'lucide-react';
import { MODES } from '../../hooks/useMode';

export default function ModeSwitcher({ mode, setMode }) {
  const isExplore = mode === MODES.EXPLORE;

  return (
    <div className="relative inline-flex items-center p-1 bg-dark-800/90 rounded-full border border-slate-700/60 shadow-lg backdrop-blur-md">
      <button
        onClick={() => setMode(MODES.EXPLORE)}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all duration-300 ${
          isExplore
            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-neon-cyan'
            : 'text-slate-400 hover:text-slate-200'
        }`}
        aria-label="Switch to 3D Explore Mode"
      >
        <Sparkles className={`w-3.5 h-3.5 ${isExplore ? 'animate-spin-slow' : ''}`} />
        <span>EXPLORE MODE</span>
      </button>

      <button
        onClick={() => setMode(MODES.QUICK)}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all duration-300 ${
          !isExplore
            ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-neon-orange'
            : 'text-slate-400 hover:text-slate-200'
        }`}
        aria-label="Switch to Quick Recruiter Mode"
      >
        <Zap className="w-3.5 h-3.5" />
        <span>QUICK MODE</span>
      </button>
    </div>
  );
}
