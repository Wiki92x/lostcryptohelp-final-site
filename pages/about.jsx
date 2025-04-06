'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-500 mb-6">About LostCryptoHelp</h1>

        <p className="text-gray-300 text-lg mb-6">
          LostCryptoHelp is a real-time Web3 security platform built to protect everyday crypto users from scams, rugpulls, fake tokens, and wallet vulnerabilities — all without relying on traditional SaaS platforms or centralized systems.
        </p>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-purple-400 mb-2">What We Do</h2>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>Scan any wallet for risky approvals or malicious token access</li>
            <li>Auto-audit smart contracts and presale launches</li>
            <li>Revoke access to scam contracts directly from your wallet</li>
            <li>Track whale movements, sniper bots, and phishing links</li>
            <li>Check NFT assets for blacklist or stolen flags</li>
            <li>Trigger real-time alerts via Telegram — no emails, no spam</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-purple-400 mb-2">Why You Can Trust Us</h2>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>Fully crypto-native — no PayPal, no Stripe, no KYC</li>
            <li>Wallet-based access only. You own your data.</li>
            <li>No third-party APIs or trackers. Everything runs self-hosted or on-chain.</li>
            <li>Telegram alerts are opt-in and encrypted</li>
            <li>All scan logic is transparent and will be optionally open-sourced</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-purple-400 mb-2">Built for Survivors</h2>
          <p className="text-gray-400">
            We’ve been rugged. We’ve lost tokens. This platform was built from experience — for people who’ve been through it, and want to keep their wallets clean, safe, and protected moving forward.
          </p>
        </div>

        <div className="text-center mt-12">
          <p className="text-xl text-purple-400 font-semibold mb-4">
            Protect Your Wallet. Scan. Revoke. Survive.
          </p>
          <p className="text-gray-600 text-sm">LostCryptoHelp is not affiliated with any centralized service or exchange. This platform is designed by crypto users, for crypto users.</p>
        </div>
      </div>
    </div>
  );
}