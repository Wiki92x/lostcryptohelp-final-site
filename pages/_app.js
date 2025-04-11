// pages/_app.jsx
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Head>
        <title>LostCryptoHelp</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Recover lost crypto assets with AI-powered scans and real-time alerts." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white dark:bg-white dark:text-black transition-colors duration-300">
        <Navbar />
        <main className="px-4 pt-16"> {/* Ensures space below fixed navbar */}
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
