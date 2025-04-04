// components/Navbar.jsx
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/logo-dark.png'; // adjust path/filename

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white dark:bg-white dark:text-black">
      <Link href="/">
        <a className="flex items-center space-x-2">
          <Image src={logo} alt="LostCryptoHelp Logo" width={32} height={32} />
          <span className="font-bold text-lg">LostCryptoHelp</span>
        </a>
      </Link>
      <div className="space-x-4">
        <Link href="/deep-scan"><a className="hover:underline">Deep Scan</a></Link>
        <Link href="/report"><a className="hover:underline">Submit Report</a></Link>
      </div>
    </nav>
  );
}
