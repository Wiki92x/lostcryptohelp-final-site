// components/ReportForm.jsx
import { useState } from 'react';

export default function ReportForm({ txHash, chain, method }) {
  const [name, setName] = useState('');
  const [wallet, setWallet] = useState(txHash || '');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null); // 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { name, wallet, message, txHash, chain, method };

    try {
      const res = await fetch('/api/telegram-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setName('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name or alias"
        className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white"
      />

      <input
        type="text"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        placeholder="Your Wallet Address"
        className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white"
      />

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={5}
        placeholder="Describe what happened..."
        className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white"
      />

      <button
        type="submit"
        className="w-full py-2 rounded bg-purple-700 hover:bg-purple-800 text-white transition duration-200"
      >
        Submit Report
      </button>

      {status === 'success' && (
        <p className="text-green-500 mt-2">✅ Report submitted successfully.</p>
      )}
      {status === 'error' && (
        <p className="text-red-500 mt-2">❌ Failed to send report. Please try again.</p>
      )}
    </form>
  );
}
