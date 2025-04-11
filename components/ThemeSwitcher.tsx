'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <button
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      className="text-xl px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition"
      aria-label="Toggle Theme"
    >
      {currentTheme === 'dark' ? '🌞' : '🌙'}
    </button>
  );
}
