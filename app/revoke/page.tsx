'use client';

import { useAccount } from 'wagmi';

const mockApprovals = [
  {
    token: 'USDT',
    contract: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    spender: '0xRugPull420...',
    chain: 'Ethereum',
    risk: 'High',
  },
  {
    token: 'APE',
    contract: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    spender: '0xMarketplace123',
    chain: 'Ethereum',
    risk: 'Low',
  },
];

export default function RevokePage() {
  const { address, isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-500 mb-6">Revoke Token Approvals</h1>
        <p className="text-gray-400 mb-10">
          Scan your wallet for active approvals and revoke risky contracts. 
          Wallet: <span className="text-green-400 font-mono">{isConnected ? address : 'Connect your wallet'}</span>
        </p>

        <div className="space-y-4">
          {mockApprovals.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-900 border border-gray-700 p-4 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-white mb-1">{item.token} on {item.chain}</h3>
                <p className="text-sm text-gray-400">Spender: {item.spender}</p>
                <p className="text-sm text-yellow-400">Risk Level: {item.risk}</p>
              </div>
              <button
                onClick={() => alert(`Revoke ${item.token}`)}
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