'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useRevoke } from '@/hooks/useRevoke'; // Make sure the hook exists!

type ApprovalItem = {
  token: string;
  spender: string;
  contract: string;
  allowance: string;
  risk: string;
};

export default function RevokePage() {
  const { address, isConnected } = useAccount();
  const { revoke } = useRevoke();
  const [approvals, setApprovals] = useState<ApprovalItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchApprovals = async () => {
    if (!isConnected) return;

    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:8000/approvals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wallet: address,
          chain: 'eth', // or 'bsc' if you're on Binance Smart Chain
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Scan failed');
      setApprovals(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async (token: string, contract: string, spender: string) => {
    try {
      const txHash = await revoke(contract, spender);
      alert(`Revoke sent!\nTX Hash: ${txHash}`);

      // Trigger Telegram Alert
      await fetch('http://localhost:8000/telegram/alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wallet: address,
          token,
          spender,
          txHash,
        }),
      });
    } catch (err: any) {
      alert(`Revoke failed: ${err.message}`);
    }
  };

  useEffect(() => {
    if (isConnected) fetchApprovals();
  }, [address, isConnected]);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-500 mb-6">Revoke Token Approvals</h1>
        <p className="text-gray-400 mb-10">
          Wallet:{' '}
          <span className="text-green-400 font-mono">
            {isConnected ? address : 'Not connected'}
          </span>
        </p>

        {loading && <p className="text-yellow-400">Scanning approvals...</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="space-y-4">
          {approvals.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-900 border border-gray-700 p-4 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-white mb-1">
                  {item.token}{' '}
                  <span className="text-sm text-gray-400">
                    ({item.contract.slice(0, 6)}...{item.contract.slice(-4)})
                  </span>
                </h3>
                <p className="text-sm text-gray-400">Spender: {item.spender}</p>
                <p
                  className={`text-sm font-medium ${
                    item.risk === 'High' ? 'text-red-400' : 'text-green-400'
                  }`}
                >
                  Risk Level: {item.risk}
                </p>
              </div>
              <button
                onClick={() => handleRevoke(item.token, item.contract, item.spender)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold"
              >
                Revoke
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}