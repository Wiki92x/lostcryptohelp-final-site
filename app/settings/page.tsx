'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';

export default function SettingsPage() {
  const { address, isConnected } = useAccount();
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-500 mb-8 text-center">Settings</h1>

        <div className="bg-gray-900 p-6 rounded-xl border border-purple-600 space-y-6">
          {/* Wallet */}
          <div>
            <h2 className="text-lg font-semibold text-purple-400 mb-2">Connected Wallet</h2>
            <p className="text-sm text-gray-400 break-all">
              {isConnected ? address : 'Wallet not connected'}
            </p>
          </div>

          {/* Toggle Telegram Alerts */}
          <div>
            <h2 className="text-lg font-semibold text-purple-400 mb-2">Telegram Alerts</h2>
            <div className="flex items-center justify-between bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-300">Enable real-time alerts via Telegram</p>
              <button
                onClick={() => setAlertsEnabled(!alertsEnabled)}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition ${
                  alertsEnabled ? 'bg-green-600' : 'bg-red-600'
                }`}
              >
                {alertsEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>

          {/* Placeholder for Future Settings */}
          <div>
            <h2 className="text-lg font-semibold text-purple-400 mb-2">Coming Soon</h2>
            <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
              <li>Saved wallet addresses</li>
              <li>Theme preference (light/dark)</li>
              <li>2FA security for premium accounts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}