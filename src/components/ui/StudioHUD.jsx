import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2, Linkedin, Instagram, Mail, Compass, Layers, Award, Clock, MessageSquare } from 'lucide-react';
import ModeSwitcher from '../navigation/ModeSwitcher';
import { personalData } from '../../data/personal';

export default function StudioHUD({ isMobile, targetYaw, onSelectWall, mode, setMode }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const handleInteraction = () => {
      setShowBanner(false);
    };

    window.addEventListener('mousedown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    window.addEventListener('wheel', handleInteraction);
    window.addEventListener('scroll', handleInteraction);

    return () => {
      window.removeEventListener('mousedown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('wheel', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const navButtons = [
    { label: 'PROJECTS', yaw: 0, icon: Layers, color: 'hover:text-cyan-400 hover:border-cyan-400', active: targetYaw === 0 },
    { label: 'CERTIFICATES', yaw: 90, icon: Award, color: 'hover:text-sky-400 hover:border-sky-400', active: targetYaw === 90 },
    { label: 'TIMELINE', yaw: 180, icon: Clock, color: 'hover:text-purple-400 hover:border-purple-400', active: targetYaw === 180 },
    { label: 'CONTACT', yaw: 270, icon: MessageSquare, color: 'hover:text-orange-400 hover:border-orange-400', active: targetYaw === 270 }
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex flex-col justify-between p-3 sm:p-4">
      {/* UNIFIED SINGLE TOP HEADER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 w-full pointer-events-auto">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-neu-flat font-display font-bold text-sm text-white backdrop-blur-md shrink-0">
          <span>LOKI.DEV</span>
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs text-slate-400 font-mono hidden lg:inline">360° WORKSPACE</span>
        </div>

        {/* Center: 4 Neumorphic 360° Wall Navigation Buttons */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-neu-flat backdrop-blur-xl max-w-full overflow-x-auto">
          {navButtons.map((btn) => {
            const Icon = btn.icon;
            return (
              <button
                key={btn.label}
                onClick={() => onSelectWall(btn.yaw)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-300 border shrink-0 ${
                  btn.active
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-neu-glow'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700/60 shadow-neu-flat hover:bg-slate-800 ' + btn.color
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="font-bold text-[11px] sm:text-xs">{btn.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Mode Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          <ModeSwitcher mode={mode} setMode={setMode} />
        </div>
      </div>

      {/* BOTTOM CENTER: Drag Guidance Banner */}
      {showBanner && (
        <div className="flex flex-col items-center gap-2 pointer-events-none mb-2 transition-all duration-500">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-300 font-mono text-xs shadow-neu-flat backdrop-blur-md animate-pulse pointer-events-auto">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isMobile ? 'Swipe screen to look around 360°' : 'Click & drag mouse to look around 360° workspace'}</span>
          </div>
        </div>
      )}

      {/* BOTTOM ROW: System Status & Vertical Toolbar */}
      <div className="flex items-end justify-between w-full">
        {/* Bottom Left: 360° ROOM ONLINE Badge */}
        <div className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 font-mono text-xs text-cyan-400 shadow-neu-flat backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-bold text-[11px] sm:text-xs">360° ROOM ONLINE</span>
        </div>

        {/* Bottom Right: Vertical Toolbar */}
        <div className="pointer-events-auto flex flex-col items-center gap-2.5 p-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-neu-flat backdrop-blur-md font-mono text-xs text-slate-300">
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl hover:bg-slate-800 hover:text-cyan-400 transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <a
            href={personalData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl hover:bg-slate-800 hover:text-cyan-400 transition-colors"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={personalData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl hover:bg-slate-800 hover:text-cyan-400 transition-colors"
            title="Social Feed"
          >
            <Instagram className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${personalData.email}`}
            className="p-2 rounded-xl hover:bg-slate-800 hover:text-cyan-400 transition-colors"
            title="Send Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          <div className="mt-1 px-2 py-1 rounded-lg bg-cyan-950 text-cyan-400 font-bold text-[10px] border border-cyan-500/30">
            360°
          </div>
        </div>
      </div>
    </div>
  );
}
