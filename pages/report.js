// pages/report.js
import { useState, useEffect } from 'react';
import ReportForm from '../components/ReportForm';

export default function ReportPage() {
  const [formUnlocked, setFormUnlocked] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [chain, setChain] = useState('');
  const [verified, setVerified] = useState(false);
  const [telegramAlertsEnabled, setTelegramAlertsEnabled] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('telegramAlerts') === 'false' ? false : true;
    setTelegramAlertsEnabled(saved);
  }, []);

  const handleUnlockForm = () => {
    setFormUnlocked(true);
  };

  const handleToggle = () => {
    const newValue = !telegramAlertsEnabled;
    setTelegramAlertsEnabled(newValue);
    localStorage.setItem('telegramAlerts', newValue);
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Report Page</h1>
      <button
        onClick={handleUnlockForm}
        className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 transition"
      >
        Unlock Form
      </button>

      <div className="mt-4">
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
        <ReportForm
          txHash={txHash}
          chain={chain}
          method={verified ? '✅ Verified' : '🔓 Manual Unlock'}
        />
      )}
    </div>
  );
}
