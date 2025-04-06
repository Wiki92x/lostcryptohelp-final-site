'use client';

const features = [
  'Multi-chain Wallet Scanner',
  'Smart Contract AI Audit',
  'Rugpull Detector',
  'Wallet Risk Score + Labels',
  'Watchlist & Alerts',
  'Sniping & MEV Monitor',
  'Whale Tracking',
  'AI Portfolio Analyzer',
  'Phishing + Scam Detector',
  'NFT Stolen Tracker',
  'Honeypot Token Scanner',
  'Presale Radar & Launch Watcher',
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-purple-500 mb-6">LostCryptoHelp Tools</h1>
        <p className="text-gray-400 mb-12">Explore all features built to protect your wallet & track the market.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((tool, idx) => (
            <div
              key={idx}
              className="bg-gray-900 border border-purple-600 rounded-xl p-6 text-left shadow-md hover:shadow-purple-500/20 transition"
            >
              <h2 className="text-lg font-semibold text-purple-400 mb-2">#{idx + 1}</h2>
              <p className="text-white text-sm">{tool}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}