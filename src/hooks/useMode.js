import { useState, useEffect } from 'react';

export const MODES = {
  EXPLORE: 'EXPLORE',
  QUICK: 'QUICK'
};

const STORAGE_KEY = 'loki_portfolio_mode_preference';

export function useMode() {
  const [mode, setMode] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && (saved === MODES.EXPLORE || saved === MODES.QUICK)) {
        return saved;
      }
    } catch (e) {
      console.warn("LocalStorage unaccessible, default to EXPLORE mode");
    }
    return MODES.EXPLORE;
  });

  const toggleMode = (newMode) => {
    const targetMode = newMode || (mode === MODES.EXPLORE ? MODES.QUICK : MODES.EXPLORE);
    setMode(targetMode);
    try {
      localStorage.setItem(STORAGE_KEY, targetMode);
    } catch (e) {
      // ignore
    }
  };

  return { mode, setMode: toggleMode, isExplore: mode === MODES.EXPLORE, isQuick: mode === MODES.QUICK };
}
