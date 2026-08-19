import React from 'react';
import { ChevronDown, MousePointer } from 'lucide-react';

export default function ScrollIndicator({ isMobile }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none text-slate-400 font-mono text-xs animate-bounce">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-900/80 border border-slate-700/60 backdrop-blur-md shadow-lg">
        <MousePointer className="w-3.5 h-3.5 text-cyan-400" />
        <span>{isMobile ? 'SWIPE TO EXPLORE WORKSPACE' : 'SCROLL TO EXPLORE WORKSPACE'}</span>
      </div>
      <ChevronDown className="w-4 h-4 text-cyan-400 mt-1" />
    </div>
  );
}
