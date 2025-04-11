'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher'; // ✅ use this now

export default function Navbar() {
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

          {/* Brand Name */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-semibold text-white dark:text-gray-900 text-lg">
              LostCryptoHelp
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/deep-scan" className="text-gray-300 hover:text-white dark:text-gray-700 dark:hover:text-gray-900">
              Deep Scan
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white dark:text-gray-700 dark:hover:text-gray-900">
              About
            </Link>

            {/* Sticky Theme Toggle */}
            <ThemeSwitcher />
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

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-2">
          <Link href="/deep-scan" className="block text-gray-300 hover:text-white dark:text-gray-700 dark:hover:text-gray-900">
            Deep Scan
          </Link>
          <Link href="/about" className="block text-gray-300 hover:text-white dark:text-gray-700 dark:hover:text-gray-900">
            About
          </Link>
          <ThemeSwitcher /> {/* Optional: also show toggle in mobile */}
        </div>
      )}
    </nav>
  );
}
