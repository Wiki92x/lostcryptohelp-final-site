'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export default function ConnectWalletPage() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="bg-gray-900 p-8 rounded-xl max-w-md w-full text-center shadow-xl">
        <h1 className="text-3xl font-bold text-purple-500 mb-6">Connect Your Wallet</h1>

        {isConnected ? (
          <>
            <p className="text-sm mb-4 text-green-400">Connected:</p>
            <p className="break-all text-gray-200 font-mono text-sm mb-6">{address}</p>
            <button
              onClick={() => disconnect()}
              className="w-full py-3 rounded-md bg-red-600 hover:bg-red-700 transition"
            >
              Disconnect Wallet
            </button>
          </>
        ) : (
          <button
            onClick={() => connect()}
            className="w-full py-3 rounded-md bg-purple-600 hover:bg-purple-700 transition font-semibold"
          >
            Connect with MetaMask
          </button>
        )}
      </div>
    </div>
  );
}