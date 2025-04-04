import { useState } from 'react';
import Head from 'next/head';
import { useTheme } from 'next-themes';

export default function DeepScanPage() {
  const { theme } = useTheme();
  const [wallet, setWallet] = useState('');
  const [chain, setChain] = useState('eth');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const fees = {
    eth: 1.5,
    bsc: 0.5,
    tron: 0.5
  };

  const handleScan = async () => {
    if (!wallet) return;
    
    setScanning(true);
    setError(null);
    
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          wallet,
          chain,
          requiredFee: fees[chain]
        }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Scan failed');
      setResult(data);
    } catch (err) {
      setError(err.message);
      console.error('Scan error:', err);
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

      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className="max-w-4xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold mb-8">Deep Wallet Scanner</h1>
          
          <div className={`p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className="mb-6">
              <label className="block mb-2 font-medium">Chain</label>
              <select
                value={chain}
                onChange={(e) => setChain(e.target.value)}
                className={`w-full p-3 rounded-md border ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
              >
                <option value="eth">Ethereum ({fees.eth} USD)</option>
                <option value="bsc">BSC ({fees.bsc} USD)</option>
                <option value="tron">TRON ({fees.tron} USD)</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Wallet Address</label>
              <input
                type="text"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                placeholder="Enter wallet address"
                className={`w-full p-3 rounded-md border ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
              />
            </div>

            <button
              onClick={handleScan}
              disabled={scanning || !wallet}
              className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 disabled:opacity-50"
            >
              {scanning ? 'Scanning...' : 'Start Deep Scan'}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {result && (
              <div className="mt-6 p-4 border rounded-md">
                <h3 className="font-semibold mb-2">Scan Results</h3>
                <pre className={`p-3 rounded overflow-x-auto ${
                  theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
                }`}>
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
