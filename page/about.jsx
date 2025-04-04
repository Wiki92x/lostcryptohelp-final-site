// pages/about.jsx

import Head from 'next/head';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6 py-10">
      <Head>
        <title>About | LostCryptoHelp</title>
        <meta name="description" content="Learn about LostCryptoHelp - the trusted platform for recovering lost crypto assets using AI-powered blockchain forensics and real-time monitoring." />
      </Head>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">About LostCryptoHelp</h1>
        <p className="mb-6 text-lg leading-relaxed">
          LostCryptoHelp is a specialized crypto forensics and fraud detection service built on cutting-edge technology. We empower users to identify, verify, and report suspicious crypto transactions using our scientifically engineered detection algorithms.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">🔍 How It Works</h2>
        <ul className="list-disc list-inside mb-6 text-lg">
          <li>
            <strong>Deep Wallet Scans:</strong> Our scanner inspects wallet addresses across Ethereum, BNB, and TRON chains using real-time data APIs.
          </li>
          <li>
            <strong>Smart Payment Verification:</strong> Before generating a report, the system automatically checks if a valid crypto payment (minimum $0.50 USD equivalent) has been sent.
          </li>
          <li>
            <strong>Submit Report:</strong> Users can submit their case anonymously. The report is instantly sent to our backend Telegram bot for analyst review.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">🤖 Built With Precision</h2>
        <p className="mb-6 text-lg leading-relaxed">
          Our core engine is written in Python and built around modular fraud detection logic. It classifies transaction behavior using blockchain data heuristics, wallet activity, and status flags. With Telegram integration, alerts are triggered in real-time for high-risk wallets.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">🧠 Why Trust LostCryptoHelp?</h2>
        <ul className="list-disc list-inside mb-6 text-lg">
          <li>Scientifically built algorithm with deterministic fraud pattern detection</li>
          <li>Fully anonymous, no account creation or personal KYC needed</li>
          <li>Transparent fee system using on-chain crypto payments only</li>
          <li>Instant Telegram alerts for real-time visibility</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">🚀 Who Is It For?</h2>
        <p className="mb-6 text-lg leading-relaxed">
          LostCryptoHelp is designed for victims of scams, suspicious transaction investigators, crypto holders doing due diligence, and service providers offering recovery help. Our tools empower you to act fast and smart.
        </p>

        <div className="text-center mt-12">
          <a href="/report" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300">
            Submit a Report Now
          </a>
        </div>
      </div>
    </div>
  );
}
