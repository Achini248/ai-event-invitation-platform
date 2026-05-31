import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    const root = document.documentElement;
    const theme = isDark ? 'dark' : 'light';

    // ✅ ONLY ONE SOURCE OF TRUTH
    root.setAttribute('data-theme', theme);

    // optional class (not required but safe)
    root.classList.toggle('dark', isDark);
    root.classList.toggle('light', !isDark);

    localStorage.setItem('theme', theme);
  }, [isDark]);

  return {
    isDark,
    toggle: () => setIsDark((prev) => !prev),
  };
};