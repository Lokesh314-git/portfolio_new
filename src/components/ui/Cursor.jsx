import React, { useState, useEffect } from 'react';

export default function Cursor({ isTouch }) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target;
      const isInteractive = target.closest('button, a, input, textarea, [data-interactive="true"]');
      setIsHovered(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Small center dot */}
      <div
        className="fixed w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[9999] transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 shadow-neon-cyan"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.5 : 1})`
        }}
      />
      {/* Glowing outer ring */}
      <div
        className={`fixed border rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out -translate-x-1/2 -translate-y-1/2 ${
          isHovered
            ? 'w-10 h-10 border-cyan-400 bg-cyan-400/10 box-glow-cyan scale-110'
            : 'w-7 h-7 border-cyan-500/40 bg-transparent'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : isHovered ? 1.2 : 1})`
        }}
      />
    </>
  );
}
