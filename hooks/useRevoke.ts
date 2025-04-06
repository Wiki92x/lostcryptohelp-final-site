'use client';

import { usePublicClient, useWalletClient } from 'wagmi';
import { parseAbi, encodeFunctionData } from 'viem';

export function useRevoke() {
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const revoke = async (tokenAddress: string, spender: string) => {
    if (!walletClient) throw new Error('Wallet not connected');

    const abi = parseAbi(['function approve(address spender, uint256 amount) public returns (bool)']);

    const tx = {
      to: tokenAddress,
      data: encodeFunctionData({
        abi,
        functionName: 'approve',
        args: [spender, 0n],
      }),
    };

    const hash = await walletClient.sendTransaction(tx);
    return hash;
  };

  return { revoke };
}