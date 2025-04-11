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
      <div className="max-w-2xl mx-auto bg-gray-900 p-6 rounded-xl shadow space-y-6">
        <h1 className="text-3xl font-bold text-purple-500 text-center">Deep Wallet Scanner</h1>

        <div>
          <label className="text-sm text-gray-300">Select Chain</label>
          <select
            value={chain}
            onChange={(e) => setChain(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
          >
            <option value="eth">Ethereum (${fees.eth} USD)</option>
            <option value="bsc">Binance Smart Chain (${fees.bsc} USD)</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-300">Wallet Address</label>
          <input
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-sm"
            placeholder="0x..."
          />
        </div>

        <button
          onClick={handleScan}
          disabled={scanning || !wallet}
          className="w-full py-3 rounded bg-purple-600 hover:bg-purple-700 font-bold disabled:opacity-50"
        >
          {scanning ? 'Scanning...' : 'Start Deep Scan'}
        </button>

        {error && <div className="bg-red-600 p-3 text-white text-sm rounded">{error}</div>}

        {result && (
          <div className="bg-gray-800 p-4 text-sm border border-purple-500 rounded mt-4 overflow-x-auto">
            <h2 className="text-purple-400 font-bold mb-2">Top 10 Transfers</h2>
            <pre className="whitespace-pre-wrap">{JSON.stringify(result.transactions, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
