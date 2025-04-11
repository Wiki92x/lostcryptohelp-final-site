'use client';

import { useAccount } from 'wagmi';

export default function AlertsPage() {
  const { address, isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-6 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-purple-500 mb-6">Telegram Alerts</h1>

        <p className="text-gray-400 mb-8">
          Get real-time alerts about your wallet activity directly in Telegram.
          Stay ahead of scams, rugpulls, shady approvals — automatically.
        </p>

        <div className="bg-gray-900 p-6 rounded-xl shadow-md border border-purple-600 text-left">
          <h2 className="text-lg font-semibold text-purple-400 mb-4">How It Works</h2>

          <ol className="list-decimal list-inside space-y-2 text-gray-300 text-sm mb-6">
            <li>Click the button below to open our Telegram Bot.</li>
            <li>
              Send your wallet address:{' '}
              <code className="text-white font-mono">
                {isConnected ? address : '0x...'}
              </code>
            </li>
            <li>The bot will automatically link and start watching your wallet.</li>
            <li>You’ll receive alerts for revokes, scam tokens, approvals, and more.</li>
          </ol>

          <a
            href="https://t.me/YOUR_BOT_USERNAME" // 🔁 Replace with actual bot link
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-md font-semibold transition text-center w-full"
          >
            Connect to Telegram Bot
          </a>

          <p className="text-xs text-gray-500 mt-4 text-center">
            🔒 Don’t worry — we don’t read your messages or store your Telegram data.
          </p>
        </div>
      </div>
    </div>
  );
}
