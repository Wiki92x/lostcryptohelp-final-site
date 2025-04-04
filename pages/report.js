// components/ReportForm.jsx
import { useState } from 'react';

export default function ReportForm({ txHash, chain, method }) {
  const [name, setName] = useState('');
  const [wallet, setWallet] = useState(txHash || '');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, wallet, message, txHash, chain, method }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setName('');
        setWallet('');
        setMessage('');
      } else {
        setError('Failed to send report.');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setError('Unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded shadow-md max-w-3xl w-full mx-auto mt-6"
    >
      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name or Alias"
          required
          className="w-full p-3 border border-purple-500 rounded dark:bg-gray-900 dark:text-white"
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          placeholder="Your Wallet Address"
          required
          className="w-full p-3 border border-purple-500 rounded dark:bg-gray-900 dark:text-white"
        />
      </div>

      <div className="mb-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe what happened..."
          rows="5"
          required
          className="w-full p-3 border border-purple-500 rounded dark:bg-gray-900 dark:text-white"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={`w-full py-3 rounded text-white font-semibold transition ${
          submitted
            ? 'bg-green-600'
            : submitting
            ? 'bg-gray-500'
            : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {submitting ? 'Submitting...' : submitted ? '✅ Submitted' : 'Submit Report'}
      </button>

      {error && (
        <p className="text-red-500 mt-3 flex items-center">
          ❌ {error}
        </p>
      )}
    </form>
  );
}
