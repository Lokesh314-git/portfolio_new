import React, { useState, useEffect } from 'react';
import { Terminal, Cpu } from 'lucide-react';

export default function LoadingScreen({ onFinished }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING WORKSPACE...');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const statuses = [
      { p: 15, text: 'INITIALIZING 3D STUDIO ENVIRONMENT...' },
      { p: 40, text: 'LOADING PROJECT WALL SCREENS...' },
      { p: 70, text: 'CONFIGURING DEVELOPER WORKSPACE & BOOK...' },
      { p: 90, text: 'FINALIZING CYBER LIGHTING & SHADERS...' },
      { p: 100, text: 'WORKSPACE ONLINE • WELCOME TO LOKI.DEV' }
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 12) + 14;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            if (onFinished) onFinished();
          }, 400);
        }, 200);
      }
      
      setProgress(current);
      const matchedStatus = [...statuses].reverse().find(s => current >= s.p);
      if (matchedStatus) {
        setStatusText(matchedStatus.text);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-dark-900 flex flex-col items-center justify-center p-4 transition-opacity duration-500 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient background glow */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

      <div className="relative z-10 max-w-md w-full glass-panel-cyan p-8 rounded-2xl border border-cyan-500/30 flex flex-col items-center text-center shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 mb-6 shadow-neon-cyan animate-pulse">
          <Terminal className="w-7 h-7" />
        </div>

        <h1 className="font-display font-bold text-2xl tracking-wider text-white mb-1 flex items-center gap-2">
          LOKI.DEV <Cpu className="w-4 h-4 text-cyan-400 animate-spin" />
        </h1>
        <p className="text-xs font-mono text-cyan-400/80 uppercase tracking-widest mb-6">
          WEB DEVELOPER × AI/ML STUDIO
        </p>

        {/* Progress Bar Container */}
        <div className="w-full bg-dark-800 rounded-full h-3 p-0.5 border border-slate-700 mb-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-orange-500 rounded-full transition-all duration-150 ease-out shadow-neon-cyan"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dynamic Status Text */}
        <div className="flex items-center justify-between w-full font-mono text-[11px] text-slate-400">
          <span className="text-cyan-400 truncate max-w-[260px]">{statusText}</span>
          <span className="font-bold text-white ml-2">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
