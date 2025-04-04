// components/Navbar.jsx
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 dark:bg-white shadow-md">
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/logo.png" alt="LostCryptoHelp Logo" width={32} height={32} />
        <span className="text-xl font-bold text-white dark:text-black">LostCryptoHelp</span>
      </Link>

      <div className="flex items-center space-x-6">
        <Link href="/deep-scan" className="text-white dark:text-black hover:underline">Deep Scan</Link>
        <Link href="/report" className="text-white dark:text-black hover:underline">Submit Report</Link>
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="bg-purple-600 text-white text-sm px-3 py-1 rounded hover:bg-purple-700 transition"
          >
            {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
          </button>
        )}
      </div>
    </nav>
  );
}
