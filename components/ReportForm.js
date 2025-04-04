// components/ReportForm.jsx
import { useState } from 'react';

export default function ReportForm({ txHash, chain, method }) {
  const [name, setName] = useState('');
  const [wallet, setWallet] = useState(txHash || '');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch('/api/telegram-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, wallet, message, txHash, chain, method }),
    });

    if (res.ok) {
      setSuccess(true);
      setName('');
      setWallet('');
      setMessage('');
    } else {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg p-4 shadow max-w-2xl w-full"
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        className="w-full p-2 mb-4 border border-purple-500 rounded dark:bg-gray-800 dark:text-white"
        required
      />
      <input
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        placeholder="Your Wallet Address"
        className="w-full p-2 mb-4 border border-purple-500 rounded dark:bg-gray-800 dark:text-white"
        required
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Describe what happened..."
        className="w-full p-2 mb-4 border border-purple-500 rounded dark:bg-gray-800 dark:text-white"
        rows={4}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded disabled:opacity-60"
      >
        {loading ? 'Submitting...' : 'Submit Report'}
      </button>
      {success && (
        <p className="text-green-500 mt-2">✅ Report sent successfully!</p>
      )}
      {error && (
        <p className="text-red-500 mt-2">❌ Failed to send report.</p>
      )}
    </form>
  );
}
