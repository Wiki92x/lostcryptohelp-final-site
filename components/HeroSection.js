export default function HeroSection() {
  return (
    <section className="text-center py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
        Recover Lost Crypto Assets Instantly
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mb-8">
        Scan suspicious transactions, verify scam activity, and report crypto frauds anonymously — fast and securely.
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        <a href="/deep-scan" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-semibold">
          🔍 Start Deep Scan
        </a>
        <a href="/report" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-semibold">
          📝 Submit Report
        </a>
      </div>
    </section>
  );
}
