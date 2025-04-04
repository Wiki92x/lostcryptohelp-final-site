import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white dark:bg-white dark:text-black">
      <span className="font-bold text-lg">LostCryptoHelp</span>
      <div className="flex items-center space-x-4">
        <a href="/deep-scan">Deep Scan</a>
        <a href="/report">Submit Report</a>
        <ThemeToggle />
      </div>
    </nav>
  );
}
