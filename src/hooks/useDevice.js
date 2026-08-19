import { useState, useEffect } from 'react';

export function useDevice() {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouch: false,
    hasWebGL: true,
    pixelRatio: 1
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      let webgl = true;
      try {
        const canvas = document.createElement('canvas');
        webgl = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        webgl = false;
      }

      setDeviceInfo({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        isTouch: isTouchDevice,
        hasWebGL: webgl,
        pixelRatio: Math.min(window.devicePixelRatio || 1, 2)
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceInfo;
}
