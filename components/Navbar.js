// components/Navbar.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 dark:bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo in top-left corner */}
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/logo.png" 
              alt="LostCryptoHelp" 
              width={32} 
              height={32} 
              className="rounded-full"
              priority
            />
            <span className="font-semibold text-white dark:text-gray-900">
              LostCryptoHelp
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/deep-scan" className="text-gray-300 hover:text-white dark:text-gray-700 dark:hover:text-gray-900">
              Deep Scan
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white dark:text-gray-700 dark:hover:text-gray-900">
              About
            </Link>
            
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-gray-800 dark:bg-gray-200"
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white dark:text-gray-700 dark:hover:text-gray-900"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/deep-scan" className="block text-gray-300 hover:text-white dark:text-gray-700 dark:hover:text-gray-900">
              Deep Scan
            </Link>
            <Link href="/about" className="block text-gray-300 hover:text-white dark:text-gray-700 dark:hover:text-gray-900">
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
