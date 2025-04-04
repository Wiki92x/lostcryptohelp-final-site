import Head from 'next/head';
import HeroSection from '../components/HeroSection';
import WhyUsSection from '../components/WhyUsSection';
import FAQ from '../components/FAQ';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>LostCryptoHelp | Scam Detection & Crypto Recovery</title>
        <meta
          name="description"
          content="Scan suspicious transactions, verify scam activity, and report crypto frauds. Multi-chain support for ETH, BSC, and TRON."
        />
        <meta
          property="og:title"
          content="LostCryptoHelp – Crypto Recovery Platform"
        />
        <meta
          property="og:description"
          content="Scan suspicious wallets, detect fraud, and report scams. Anonymous. Multi-chain."
        />
        <link rel="canonical" href="https://lostcryptohelp.pro" />
      </Head>

      <main>
        <HeroSection />
        <WhyUsSection />
        <FAQ />

        <section className="bg-gray-800 text-white py-12 px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Crypto?</h2>
          <p className="mb-6">
            Start a deep scan or submit a report — no sign up required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/deep-scan"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-semibold"
            >
              🔍 Deep Scan
            </a>
            <a
              href="/report"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-semibold"
            >
              📝 Submit Report
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
