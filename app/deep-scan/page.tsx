'use client';

import { useState } from 'react';

const fees = {
  eth: 1.5,
  bsc: 0.5,
  tron: 0.5,
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

      if (!res.ok) {
        throw new Error(data?.message || data?.error || 'Scan failed');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-xl mx-auto space-y-8">
        <h1 className="text-center text-4xl font-bold text-purple-500">
          Deep Wallet Scanner
        </h1>

        <div className="bg-gray-900 rounded-xl p-6 shadow-xl space-y-6">
          {/* Chain Selector */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Select Chain
            </label>
            <select
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none"
              value={chain}
              onChange={(e) => setChain(e.target.value)}
            >
              <option value="eth">Ethereum (${fees.eth} USD)</option>
              <option value="bsc">Binance Smart Chain (${fees.bsc} USD)</option>
              <option value="tron" disabled>TRON (Coming Soon)</option>
            </select>
          </div>

          {/* Wallet Input */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Wallet Address
            </label>
            <input
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-sm"
              type="text"
              placeholder="0x... or BSC address"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
            />
          </div>

          {/* Scan Button */}
          <button
            onClick={handleScan}
            disabled={scanning || !wallet}
            className="w-full py-3 font-semibold rounded-md bg-purple-600 hover:bg-purple-700 disabled:opacity-50 transition"
          >
            {scanning ? 'Scanning...' : 'Start Deep Scan'}
          </button>

          {/* Error */}
          {error && (
            <div className="p-3 rounded-md bg-red-600 text-white text-sm text-center">
              {error}
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="p-4 mt-4 rounded-md bg-gray-800 border border-purple-600 text-sm overflow-x-auto">
              <h2 className="text-purple-400 font-semibold mb-2">
                Scan Results
              </h2>
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
