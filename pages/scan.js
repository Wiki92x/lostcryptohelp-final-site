// pages/scan.js

import { useState } from 'react';

export default function ScanPage() {
  const [wallet, setWallet] = useState('');
  const [result, setResult] = useState(null);

  const handleScan = async () => {
    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error('Scan error:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Wallet Scanner</h1>
      <input
        type="text"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        placeholder="Enter wallet address"
        className="border px-4 py-2 rounded mr-2"
      />
      <button onClick={handleScan} className="bg-blue-600 text-white px-4 py-2 rounded">
        Scan
      </button>

      {result && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
