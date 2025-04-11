// app/layout.tsx
export const metadata = {
  title: 'LostCryptoHelp',
  description: 'AI-driven crypto recovery tools',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
