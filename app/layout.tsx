'use client';

import './globals.css'; // ✅ adjust path if needed
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
