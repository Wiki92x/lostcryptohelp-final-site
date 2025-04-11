'use client';

import '../styles/globals.css'; // ✅ correctly points to /styles/

import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from '@/lib/wagmiClient';

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
