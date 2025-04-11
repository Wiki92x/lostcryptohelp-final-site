'use client';

import './globals.css';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from '@/lib/wagmiClient';

export const metadata = {
  title: 'LostCryptoHelp',
  description: 'Secure Web3 recovery suite',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WagmiConfig config={wagmiConfig}>
          {children}
        </WagmiConfig>
      </body>
    </html>
  );
}
