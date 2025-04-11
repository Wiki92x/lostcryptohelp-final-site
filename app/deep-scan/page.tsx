'use client';

import { useState } from 'react';

const fees = {
  eth: 1.5,
  bsc: 0.5,
};

export default function DeepScanPage() {
  const [wallet, setWallet] = useState('');
  const [chain, setChain] = useState('eth');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleScan = async () => {
    if (!wallet) return;

    setScanning(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/deepscan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet, chain }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Scan failed');

      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-purple-500 text-center">
          Deep Wallet Scanner
        </h1>

        <div className="bg-gray-900 p-6 rounded-xl shadow-md space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Select Chain</label>
            <select
              value={chain}
              onChange={(e) => setChain(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 p-3 rounded-md focus:outline-none"
            >
              <option value="eth">Ethereum (${fees.eth} USD)</option>
              <option value="bsc">Binance Smart Chain (${fees.bsc} USD)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Wallet Address</label>
            <input
              type="text"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              placeholder="0x..., etc."
              className="w-full bg-gray-800 border border-gray-700 p-3 rounded-md focus:outline-none text-sm"
            />
          </div>

          <button
            onClick={handleScan}
            disabled={scanning || !wallet}
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-md font-semibold transition disabled:opacity-50"
          >
            {scanning ? 'Scanning...' : 'Start Deep Scan'}
          </button>

          {error && (
            <div className="bg-red-600 text-white p-3 rounded-md text-sm">{error}</div>
          )}

          {result && (
            <div className="bg-gray-800 border border-purple-500 p-4 rounded-md text-sm mt-4 overflow-x-auto">
              <h2 className="font-semibold text-purple-400 mb-2">Scan Results</h2>
              <pre className="whitespace-pre-wrap break-words">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
