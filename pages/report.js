// components/ReportForm.jsx
import { useState } from 'react';

export default function ReportForm({ txHash, chain, method }) {
  const [wallet, setWallet] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle the actual form submission logic
    console.log('Submitted:', { wallet, description, txHash, chain, method });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors"
    >
      <input
        type="text"
        placeholder="Your Wallet Address"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        required
      />

      <textarea
        placeholder="Describe what happened..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        required
      />

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition"
      >
        Submit Report
      </button>
    </form>
  );
}
