import { useEffect, useState } from 'react';

export default function ScanHistory() {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    // Simulate fetching history (replace with real backend if available)
    const mockHistory = [
      { wallet: '0xabc123...', score: 5, status: 'Scam', time: '2025-04-03 10:12' },
      { wallet: '0x456def...', score: 2, status: 'Safe', time: '2025-04-03 09:47' },
      { wallet: 'bnb1xyz...', score: 4, status: 'Warning', time: '2025-04-03 09:15' },
    ];
    setScans(mockHistory);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">📜 Scan History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-md">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="p-3">Wallet</th>
              <th className="p-3">Risk Score</th>
              <th className="p-3">Status</th>
              <th className="p-3">Scanned At</th>
            </tr>
          </thead>
          <tbody>
            {scans.map((scan, index) => (
              <tr key={index} className="hover:bg-gray-700">
                <td className="p-3">{scan.wallet}</td>
                <td className="p-3">{scan.score}</td>
                <td className="p-3">{scan.status}</td>
                <td className="p-3">{scan.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
