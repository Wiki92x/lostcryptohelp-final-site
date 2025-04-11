'use client';

import { useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';

export default function DeepScanReport({ result }: { result: any }) {
  const [reportReady, setReportReady] = useState(false);

  useEffect(() => {
    if (result) setReportReady(true);
  }, [result]);

  const handleExportPDF = () => {
    const element = document.getElementById('scan-report');
    if (!element) return;
    html2pdf()
      .set({
        filename: `deepscan-${result.wallet}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      })
      .from(element)
      .save();
  };

  if (!reportReady) return null;

  return (
    <div id="scan-report" className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-purple-600 text-black dark:text-white">
      <h2 className="text-3xl font-bold text-purple-500 mb-4">🔍 DeepScan Report</h2>

      <div className="mb-6">
        <p><strong>Wallet:</strong> {result.wallet}</p>
        <p><strong>Chain:</strong> {result.chain.toUpperCase()}</p>
        <p className="text-green-400 font-semibold mt-2">
          ✅ {result.transfers.length} token transfers analyzed
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-700">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th className="p-2 text-left">Token</th>
              <th className="p-2 text-left">Value</th>
              <th className="p-2 text-left">Risk Flags</th>
            </tr>
          </thead>
          <tbody>
            {result.transfers.map((t: any, i: number) => (
              <tr key={i} className="border-t border-gray-700 hover:bg-gray-800">
                <td className="p-2 font-semibold">{t.symbol}</td>
                <td className="p-2">{t.value}</td>
                <td className="p-2">
                  {Object.entries(t.risk_flags).map(([flag, val]) => (
                    val === '1' ? (
                      <span key={flag} className="inline-block bg-red-600 text-white text-xs px-2 py-1 rounded mr-2">
                        {flag.replace(/_/g, ' ')}
                      </span>
                    ) : null
                  )) || <span className="text-green-400 text-xs">✅ Clean</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={handleExportPDF}
        className="mt-6 px-4 py-2 bg-purple-700 hover:bg-purple-800 rounded text-white font-semibold"
      >
        📄 Download Report as PDF
      </button>
    </div>
  );
}
