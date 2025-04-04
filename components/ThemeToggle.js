import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <button
      onClick={() =>
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
      }
      className="border px-2 py-1 rounded"
    >
      {resolvedTheme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
