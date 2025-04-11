import { useState } from 'react';

export default function useRevoke() {
  const [revoking, setRevoking] = useState(false);

  const revokeAccess = async (wallet: string) => {
    setRevoking(true);
    try {
      // Mock: Replace with real revoke logic or API
      await new Promise((res) => setTimeout(res, 1500));
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Failed to revoke' };
    } finally {
      setRevoking(false);
    }
  };

  return { revoking, revokeAccess };
}
