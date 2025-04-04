import { useState } from 'react';

export default function ReportForm({ txHash, chain, method }) {
  const [name, setName] = useState('');
  const [wallet, setWallet] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, wallet, message, txHash, chain, method }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus('Report submitted successfully.');
        setName('');
        setWallet('');
        setMessage('');
      } else {
        setStatus('Failed to submit report.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-xl space-y-4">
      <div>
        <label className="block font-semibold mb-1">Your Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 rounded border border-gray-400 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Your Wallet Address</label>
        <input
          type="text"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          required
          className="w-full p-2 rounded border border-gray-400 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full p-2 rounded border border-gray-400 dark:bg-gray-800 dark:text-white"
        ></textarea>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-300">
        <p><strong>Chain:</strong> {chain}</p>
        <p><strong>Tx Hash:</strong> {txHash}</p>
        <p><strong>Method:</strong> {method}</p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800 transition disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit Report'}
      </button>

      {status && <p className="mt-4 font-medium text-green-500 dark:text-green-400">{status}</p>}
    </form>
  );
}
