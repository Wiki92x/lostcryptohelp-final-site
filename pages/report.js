// components/ReportForm.jsx
import { useState } from 'react';

export default function ReportForm({ txHash, chain, method }) {
  const [name, setName] = useState('');
  const [wallet, setWallet] = useState(txHash || '');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          wallet,
          message,
          txHash,
          chain,
          method,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setName('');
        setWallet('');
        setMessage('');
      } else {
        setStatus('fail');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setStatus('fail');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow-md space-y-4 text-black dark:text-white">
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-2 rounded border border-purple-500 dark:bg-gray-900 dark:text-white"
      />

      <input
        type="text"
        placeholder="Your Wallet Address"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        required
        className="w-full p-2 rounded border border-purple-500 dark:bg-gray-900 dark:text-white"
      />

      <textarea
        placeholder="Describe what happened..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        rows={5}
        className="w-full p-2 rounded border border-purple-500 dark:bg-gray-900 dark:text-white"
      />

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition"
      >
        {submitting ? 'Sending...' : 'Submit Report'}
      </button>

      {status === 'success' && <p className="text-green-500 mt-2">✅ Report sent successfully.</p>}
      {status === 'fail' && <p className="text-red-500 mt-2">❌ Failed to send report.</p>}
    </form>
  );
}
