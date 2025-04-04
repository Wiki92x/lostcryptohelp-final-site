import { useState } from 'react';
import Head from 'next/head';

export default function DeepScanPage() {
  const [wallet, setWallet] = useState('');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = async () => {
    if (!wallet) return;
    
    setScanning(true);
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
    } finally {
      setScanning(false);
    }
  };

  return (
    <>
      <Head>
        <title>Deep Scan | LostCryptoHelp</title>
        <meta name="description" content="Deep scan wallet addresses for potential crypto scams" />
      </Head>

      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Deep Wallet Scanner</h1>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="mb-6">
            <label className="block mb-2">Wallet Address</label>
            <input
              type="text"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              placeholder="Enter ETH, BSC, or TRON address"
              className="w-full p-3 border rounded-md"
            />
          </div>

          <button
            onClick={handleScan}
            disabled={scanning || !wallet}
            className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 disabled:opacity-50"
          >
            {scanning ? 'Scanning...' : 'Start Deep Scan'}
          </button>

          {result && (
            <div className="mt-6 p-4 border rounded-md">
              <pre className="whitespace-pre-wrap overflow-x-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
