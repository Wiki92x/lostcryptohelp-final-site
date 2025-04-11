'use client';

import { useState } from 'react';
import DeepScanReport from '@/components/DeepScanReport';

export default function DeepScanPage() {
  const [wallet, setWallet] = useState('');
  const [chain, setChain] = useState('eth');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScan = async () => {
    if (!wallet) return;

    setLoading(true);
    setError(null);
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
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-purple-500 text-center">
          Deep Wallet Scanner
        </h1>

        <div className="bg-gray-900 p-6 rounded-xl shadow-md space-y-6">
          {/* Chain Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Select Chain
            </label>
            <select
              value={chain}
              onChange={(e) => setChain(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 p-3 rounded-md focus:outline-none"
            >
              <option value="eth">Ethereum</option>
              <option value="bsc" disabled>Binance Smart Chain (coming soon)</option>
              <option value="tron" disabled>TRON (coming soon)</option>
            </select>
          </div>

          {/* Wallet Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Wallet Address
            </label>
            <input
              type="text"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              placeholder="0x..., T..., etc."
              className="w-full bg-gray-800 border border-gray-700 p-3 rounded-md focus:outline-none text-sm"
            />
          </div>

          {/* Scan Button */}
          <button
            onClick={handleScan}
            disabled={loading || !wallet}
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-md font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Scanning...' : 'Start Deep Scan'}
          </button>

          {/* Error Message */}
          {error && (
            <div className="bg-red-600 text-white p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Scan Report */}
          {result && <DeepScanReport result={result} />}
        </div>
      </div>
    </div>
  );
}
