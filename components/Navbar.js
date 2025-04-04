// components/Navbar.js
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 dark:bg-white text-white dark:text-black shadow">
      <Link href="/">
        <div className="flex items-center cursor-pointer">
          <Image
            src="/logo-darkpurple.png" // Ensure this file exists in the public folder
            alt="LostCryptoHelp Logo"
            width={36}
            height={36}
            className="rounded-full mr-2"
          />
          <span className="font-bold text-lg">LostCryptoHelp</span>
        </div>
      </Link>
      <div className="flex items-center space-x-4">
        <Link href="/deep-scan" className="hover:underline">Deep Scan</Link>
        <Link href="/report" className="hover:underline">Submit Report</Link>
        <button
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          className="border px-2 py-1 rounded text-sm bg-white dark:bg-gray-800 text-black dark:text-white"
        >
          {resolvedTheme === 'dark' ? '🌞 Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
}
