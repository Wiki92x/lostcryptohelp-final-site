export default function WhyUsSection() {
  return (
    <section className="py-16 px-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Why Choose LostCryptoHelp?</h2>
        <p className="text-lg mb-12 max-w-3xl mx-auto">
          We combine advanced blockchain analytics, AI-driven detection, and human expertise to recover lost or stolen crypto assets — all with zero signup required.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          <div>
            <h3 className="text-xl font-semibold mb-2">🔍 Deep Wallet Scans</h3>
            <p>Instant multi-chain transaction inspection across ETH, BSC, and TRON to detect red flags and scam behavior.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">🧠 AI + Human Reports</h3>
            <p>Get automated forensic reports with scam type classification — or upgrade for a human analyst review.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">📲 Real-Time Alerts</h3>
            <p>Receive wallet activity alerts and scam reports directly via Telegram — stay one step ahead at all times.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">💸 Crypto-Only Payments</h3>
            <p>We keep it decentralized. No credit cards. No Stripe. Just BNB, ETH, and TRC-20 wallet validation.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
