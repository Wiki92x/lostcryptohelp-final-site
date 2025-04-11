'use client';

import { configureChains, createConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
});
