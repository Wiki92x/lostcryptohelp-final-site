// pages/report.js
import { useState, useEffect } from 'react';
import ReportForm from '../components/ReportForm';

const TOKEN_ESTIMATES = {
  ETH: '≈ 0.0005 ETH',
  BNB: '≈ 0.002 BNB',
  TRON: '≈ 10 TRX',
};

const PRICE_USD = {
  ETH: 1.5,
  BNB: 0.5,
  TRON: 0.5,
};

export default function ReportPage() {
  const [formUnlocked, setFormUnlocked] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [chain, setChain] = useState('ETH');
  const [verified, setVerified] = useState(false);
  const [telegramAlertsEnabled, setTelegramAlertsEnabled] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('telegramAlerts');
    setTelegramAlertsEnabled(saved !== 'false');
  }, []);

  const handleVerify = async () => {
    if (!txHash || !chain) {
      alert('Please enter both transaction hash and chain.');
      return;
    }

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ txHash, chain }),
      });

      const data = await res.json();
      if (data.success) {
        setVerified(true);
        setFormUnlocked(true);
        alert('Payment verified. You may now submit the report.');
      } else {
        alert('Verification failed. You may use manual unlock.');
      }
    } catch (err) {
      console.error(err);
      alert('Error verifying payment.');
    }
  };

  const handleManualUnlock = () => {
    setFormUnlocked(true);
    setVerified(false);
  };

  const handleToggle = () => {
    const newVal = !telegramAlertsEnabled;
    setTelegramAlertsEnabled(newVal);
    localStorage.setItem('telegramAlerts', newVal);
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Report Page</h1>

      <div className="space-y-4 max-w-xl">
        <div>
          <input
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
            className="w-full p-2 border border-purple-500 rounded dark:bg-gray-800 dark:text-white"
            placeholder="Enter transaction hash"
          />
        </div>

        <div>
          <select
            value={chain}
            onChange={(e) => setChain(e.target.value)}
            className="w-full p-2 border border-purple-500 rounded dark:bg-gray-800 dark:text-white"
          >
            <option value="ETH">Ethereum</option>
            <option value="BNB">BNB Smart Chain</option>
            <option value="TRON">TRON (TRC-20)</option>
          </select>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300">
          Required Fee: <strong>${PRICE_USD[chain]}</strong> → <span className="text-purple-600">{TOKEN_ESTIMATES[chain]}</span>
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleVerify}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Verify Payment
          </button>
          <button
            onClick={handleManualUnlock}
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
          >
            Manual Unlock
          </button>
        </div>

        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={telegramAlertsEnabled}
              onChange={handleToggle}
              className="form-checkbox h-5 w-5 text-purple-600"
            />
            <span className="ml-2">Enable Telegram alerts</span>
          </label>
        </div>
      </div>

      {formUnlocked && (
        <div className="mt-8">
          <ReportForm
            txHash={txHash}
            chain={chain}
            method={verified ? '✅ Verified' : '🔓 Manual Unlock'}
          />
        </div>
      )}
    </div>
  );
}
