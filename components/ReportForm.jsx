'use client';

import ReportForm from '../components/ReportForm';
import { useState, ChangeEvent, FormEvent } from 'react';




interface ReportFormProps {
  txHash?: string;
  chain?: string;
  method?: string;
}

export default function ReportForm({ txHash, chain, method }: ReportFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    wallet: '',
    message: '',
  });

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          txHash,
          chain,
          method,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('✅ Report submitted successfully.');
        setFormData({ name: '', wallet: '', message: '' });
      } else {
        setStatus('❌ Failed to send report.');
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Error submitting report.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-xl w-full max-w-2xl"
    >
      <div className="mb-4">
        <label className="block mb-1 font-medium">Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-purple-400 dark:border-purple-600 rounded bg-white dark:bg-gray-900 dark:text-white"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Wallet Address</label>
        <input
          name="wallet"
          value={formData.wallet}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-purple-400 dark:border-purple-600 rounded bg-white dark:bg-gray-900 dark:text-white"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">What happened?</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-purple-400 dark:border-purple-600 rounded bg-white dark:bg-gray-900 dark:text-white"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 rounded bg-purple-700 text-white font-semibold hover:bg-purple-800 disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit Report'}
      </button>

      {status && <p className="mt-4 text-sm">{status}</p>}
    </form>
  );
}
