'use client';

const mockPresales = [
  {
    name: 'FOMO Finance',
    chain: 'BSC',
    launch: '2025-04-10',
    lpLocked: true,
    flagged: false,
    audit: 'None',
  },
  {
    name: 'Shadow Inu',
    chain: 'ETH',
    launch: '2025-04-09',
    lpLocked: false,
    flagged: true,
    audit: 'Honeypot Risk',
  },
];

export default function PresaleRadarPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-500 mb-6 text-center">Presale Radar</h1>
        <p className="text-gray-400 text-center mb-12">
          Track new and trending token launches. Filter out honeypots before they hit you.
        </p>

        <div className="space-y-4">
          {mockPresales.map((token, idx) => (
            <div
              key={idx}
              className="bg-gray-900 p-6 rounded-xl border border-purple-600 flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-bold text-purple-400">{token.name}</h2>
                <p className="text-sm text-gray-300">
                  Chain: {token.chain} | Launch Date: {token.launch}
                </p>
                <p className="text-sm text-gray-400">
                  LP Locked: {token.lpLocked ? 'Yes' : 'No'} | Audit: {token.audit}
                </p>
              </div>
              <div>
                {token.flagged ? (
                  <span className="bg-red-600 text-white px-3 py-1 rounded-md text-sm">⚠️ Risky</span>
                ) : (
                  <span className="bg-green-600 text-white px-3 py-1 rounded-md text-sm">Safe</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}