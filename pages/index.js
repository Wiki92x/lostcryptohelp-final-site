// pages/index.js
import Head from 'next/head';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Head>
        <title>LostCryptoHelp - Crypto Recovery Services</title>
        <meta name="description" content="Professional crypto recovery and deep scanning services" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-center mb-8">
            Welcome to LostCryptoHelp
          </h1>
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Recover Lost Crypto Assets Instantly
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
              Scan suspicious transactions, verify scam activity, and report crypto frauds anonymously — fast and securely.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/deep-scan">
                <button className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-full text-lg font-medium">
                  🔍 Start Deep Scan
                </button>
              </Link>
              <Link href="/report">
                <button className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-full text-lg font-medium">
                  📝 Submit Report
                </button>
              </Link>
            </div>
          </div>

          <section className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto text-center">
            <div>
              <p className="text-xl font-semibold mb-2">🧠 AI + Human Reports</p>
              <p className="text-sm text-gray-400">Automated forensic reports with scam classification.</p>
            </div>
            <div>
              <p className="text-xl font-semibold mb-2">💬 Real-Time Alerts</p>
              <p className="text-sm text-gray-400">Telegram updates when suspicious activity is detected.</p>
            </div>
            <div>
              <p className="text-xl font-semibold mb-2">🔗 Deep Wallet Scan</p>
              <p className="text-sm text-gray-400">Multi-chain scan across ETH, BSC, TRON for red flags.</p>
            </div>
            <div>
              <p className="text-xl font-semibold mb-2">💰 Crypto-Only Payments</p>
              <p className="text-sm text-gray-400">No Stripe or PayPal. Just smart contract validation.</p>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
