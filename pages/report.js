// components/ReportForm.jsx
import { useState } from 'react';

export default function ReportForm({ txHash, chain, method }) {
  const [name, setName] = useState('');
  const [wallet, setWallet] = useState(txHash || '');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, wallet, message, txHash, chain, method }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-4 rounded shadow max-w-3xl w-full">
      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full p-2 border border-purple-500 rounded dark:bg-gray-800 dark:text-white"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          placeholder="Your Wallet Address"
          className="w-full p-2 border border-purple-500 rounded dark:bg-gray-800 dark:text-white"
          required
        />
      </div>
      <div className="mb-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe what happened..."
          rows={4}
          className="w-full p-2 border border-purple-500 rounded dark:bg-gray-800 dark:text-white"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
      >
        Submit Report
      </button>

      {status === 'success' && (
        <p className="mt-4 text-green-500">✅ Report submitted successfully.</p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-red-500">❌ Failed to send report.</p>
      )}
    </form>
  );
}
