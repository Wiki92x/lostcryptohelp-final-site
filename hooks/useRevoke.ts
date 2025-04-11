'use client';

import { useState } from 'react';

export default function useRevoke() {
  const [revoking, setRevoking] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const revokeAccess = async (wallet: string, chain: string) => {
    setRevoking(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/revoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet, chain }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unknown error');

      setResult('✅ Revoke successful');
    } catch (err: any) {
      setError(err.message || '❌ Failed to revoke');
    } finally {
      setRevoking(false);
    }
  };

  return { revoking, revokeAccess, result, error };
}
