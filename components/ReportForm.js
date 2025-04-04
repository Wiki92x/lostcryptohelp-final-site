import { useState } from 'react';

export default function ReportForm({ txHash, chain, method }) {
  const [form, setForm] = useState({ name: '', wallet: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    const payload = {
      ...form,
      txHash,
      chain,
      method,
    };

    try {
      const res = await fetch('/api/telegram-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus('✅ Report submitted successfully!');
        setForm({ name: '', wallet: '', message: '' });
      } else {
        setStatus('❌ Failed to send report.');
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Error occurred.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded-lg">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        className="w-full p-2 rounded text-black"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="wallet"
        placeholder="Your Wallet Address"
        className="w-full p-2 rounded text-black"
        value={form.wallet}
        onChange={handleChange}
        required
      />
      <textarea
        name="message"
        placeholder="Describe what happened..."
        rows="4"
        className="w-full p-2 rounded text-black"
        value={form.message}
        onChange={handleChange}
        required
      />
      <button type="submit" className="bg-green-600 px-4 py-2 rounded text-white w-full">
        Submit Report
      </button>
      {status && <p className="text-sm mt-2">{status}</p>}
    </form>
  );
}
