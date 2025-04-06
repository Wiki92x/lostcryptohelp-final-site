'use client';

const plans = [
  {
    title: 'Free',
    price: '$0',
    features: [
      '1 Wallet Scan Per Day',
      'Basic Risk Score',
      'Telegram Alert Preview',
    ],
  },
  {
    title: 'Pro',
    price: '$9.99/month',
    features: [
      '5 Wallets',
      'Full Deep Scan Access',
      'AI Contract Audit',
      'Export Reports (PDF)',
      'Telegram Alerts',
    ],
  },
  {
    title: 'Premium',
    price: '$29.99/month',
    features: [
      '20+ Wallets',
      'NFT Scam Detection',
      'Whale Watch & Sniper Alerts',
      'Smart Token Radar',
      'VIP Telegram Group Access',
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-purple-500">Choose Your Plan</h1>
        <p className="text-gray-400 mb-12">
          Start for free — upgrade anytime. Crypto-native, no fiat needed.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className="bg-gray-900 border border-purple-600 rounded-xl p-6 text-left shadow-lg"
            >
              <h2 className="text-2xl font-bold text-purple-400 mb-4">{plan.title}</h2>
              <p className="text-3xl font-semibold mb-6">{plan.price}</p>
              <ul className="space-y-3 text-sm text-gray-300 mb-6">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mr-3" />
                    {feat}
                  </li>
                ))}
              </ul>
              <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-md font-medium transition">
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}