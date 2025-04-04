import { useState } from 'react';

export default function ScanPage() {
  const [wallet, setWallet] = useState('');
  const [result, setResult] = useState(null);

  const handleScan = async () => {
    const res = await fetch('/api/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wallet }),
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div>
      <input value={wallet} onChange={e => setWallet(e.target.value)} />
      <button onClick={handleScan}>Scan</button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
