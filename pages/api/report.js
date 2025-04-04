// pages/report.js
import { useState, useEffect } from 'react';
import ReportForm from '../components/ReportForm';

export default function ReportPage() {
  const [formUnlocked, setFormUnlocked] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [chain, setChain] = useState('ETH');
  const [verified, setVerified] = useState(false);
  const [telegramAlertsEnabled, setTelegramAlertsEnabled] = useState(true);
  const [priceData, setPriceData] = useState({ ETH: 0, BNB: 0, TRON: 0 });

  const usdFees = {
    ETH: 1.5,
    BNB: 0.5,
    TRON: 0.5,
  };

  useEffect(() => {
    const saved = localStorage.getItem('telegramAlerts');
    setTelegramAlertsEnabled(saved !== 'false');
    fetchTokenPrices();
  }, []);

  const fetchTokenPrices = async () => {
    try {
      const res = await fetch('/api/token-prices');
      const data = await res.json();
      setPriceData(data);
    } catch (err) {
      console.error('Price fetch failed', err);
    }
  };

  const handleVerify = async () => {
    if (!txHash || !chain) {
      alert('Enter transaction hash and chain');
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
        alert('✅ Payment verified. Report form unlocked.');
      } else {
        alert('❌ Verification failed. Use manual unlock if needed.');
      }
    } catch (err) {
      alert('Error verifying transaction');
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

  const usd = usdFees[chain] || 0;
  const tokenPrice = priceData[chain] || 0;
  const tokenAmount = tokenPrice ? (usd / tokenPrice).toFixed(6) : '...';

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Report Page</h1>

      <div className="space-y-4 max-w-xl">
        <input
          value={txHash}
          onChange={(e) => setTxHash(e.target.value)}
          className="w-full p-2 border border-purple-500 rounded dark:bg-gray-800 dark:text-white"
          placeholder="Transaction Hash"
        />

        <select
          value={chain}
          onChange={(e) => setChain(e.target.value)}
          className="w-full p-2 border border-purple-500 rounded dark:bg-gray-800 dark:text-white"
        >
          <option value="ETH">Ethereum</option>
          <option value="BNB">BNB Smart Chain</option>
          <option value="TRON">TRON (TRC-20)</option>
        </select>

        <p className="text-sm text-gray-300 dark:text-gray-400">
          Required Payment: ${usd} ≈ {tokenAmount} {chain}
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
