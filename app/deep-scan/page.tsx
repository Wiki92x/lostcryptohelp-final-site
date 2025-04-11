'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

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
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-purple-400">Deep Wallet Scanner</h1>

      <div className="w-full max-w-md bg-[#111827] p-6 rounded-2xl shadow-lg space-y-4">
        <select
          value={chain}
          onChange={(e) => setChain(e.target.value)}
          className="w-full p-2 rounded bg-gray-900 border border-gray-700"
        >
          <option value="eth">Ethereum (${fees.eth} USD)</option>
          <option value="bsc">Binance Smart Chain (${fees.bsc} USD)</option>
          <option value="tron">TRON (${fees.tron} USD)</option>
        </select>

        <input
          type="text"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          placeholder="Wallet Address"
          className="w-full p-2 rounded bg-gray-900 border border-gray-700"
        />

        <button
          onClick={handleScan}
          className="w-full bg-purple-600 hover:bg-purple-700 transition p-2 rounded"
          disabled={scanning}
        >
          {scanning ? 'Scanning...' : 'Start Deep Scan'}
        </button>

        <button
          onClick={() => router.push('/')}
          className="w-full mt-2 bg-gray-700 hover:bg-gray-600 transition p-2 rounded"
        >
          ← Back to Homepage
        </button>

        {error && <div className="w-full bg-red-600 text-white p-2 rounded text-center">{error}</div>}

        {result && (
          <pre className="w-full text-sm bg-gray-800 text-green-400 p-4 rounded max-h-[400px] overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
