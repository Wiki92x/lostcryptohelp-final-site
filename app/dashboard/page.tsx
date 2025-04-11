'use client';

import { useAccount } from 'wagmi';

const mockHistory = [
  {
    wallet: '0x1234...abcd',
    chain: 'ETH',
    score: 'Safe',
    scannedAt: '2025-04-06 18:22',
  },
  {
    wallet: '0x89fd...3421',
    chain: 'BSC',
    score: 'High Risk',
    scannedAt: '2025-04-06 13:40',
  },
];

export default function DashboardPage() {
  const { address, isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-500 mb-2">Your Dashboard</h1>
        <p className="text-gray-400 mb-8">
          Welcome back{' '}
          {isConnected ? (
            <span className="text-green-400 font-mono">{address}</span>
          ) : (
            <span className="italic text-yellow-500">degen</span>
          )}
          .
        </p>

        <div className="bg-gray-900 p-6 rounded-xl border border-purple-600 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-purple-400">Recent Scans</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="text-gray-400 border-b border-gray-700">
                <tr>
                  <th className="py-2 pr-4">Wallet</th>
                  <th className="py-2 pr-4">Chain</th>
                  <th className="py-2 pr-4">Risk Score</th>
                  <th className="py-2">Scanned At</th>
                </tr>
              </thead>
              <tbody>
                {mockHistory.map((item, idx) => (
                  <tr key={idx} className="border-t border-gray-800">
                    <td className="py-2 pr-4 font-mono">{item.wallet}</td>
                    <td className="py-2 pr-4">{item.chain}</td>
                    <td
                      className={`py-2 pr-4 font-semibold ${
                        item.score === 'High Risk' ? 'text-red-500' : 'text-green-400'
                      }`}
                    >
                      {item.score}
                    </td>
                    <td className="py-2 text-gray-400">{item.scannedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            🚧 More features coming soon: download reports, saved wallets, alert toggles...
          </div>
        </div>
      </div>
    </div>
  );
}
