import { useState, useEffect } from 'react';

export function useMouseParallax(intensity = 1) {
  const [mouse, setMouse] = useState({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Normalize mouse between -1 and 1
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      setMouse(prev => ({
        ...prev,
        targetX: x * intensity * 0.5,
        targetY: y * intensity * 0.5
      }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [intensity]);

  useEffect(() => {
    let animationFrameId;
    
    const animate = () => {
      setMouse(prev => ({
        ...prev,
        x: prev.x + (prev.targetX - prev.x) * 0.05,
        y: prev.y + (prev.targetY - prev.y) * 0.05
      }));
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return mouse;
}
