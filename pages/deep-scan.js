// pages/deep-scan.js
import { useState } from 'react';

export default function DeepScan() {
  const [wallet, setWallet] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleScan = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Scan failed');
      }

      setResult(data.message || 'Scan completed successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 px-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Deep Wallet Scan</h1>
      
      <input
        type="text"
        className="w-full px-4 py-2 rounded text-black"
        placeholder="Enter wallet address"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
      />
      
      <button
        onClick={handleScan}
        disabled={loading || !wallet}
        className="mt-4 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
      >
        {loading ? 'Scanning...' : 'Scan'}
      </button>

      {result && (
        <div className="mt-6 text-green-400 font-medium border border-green-400 p-3 rounded">
          ✅ {result}
        </div>
      )}

      {error && (
        <div className="mt-6 text-red-400 font-medium border border-red-400 p-3 rounded">
          ❌ {error}
        </div>
      )}
    </div>
  );
}