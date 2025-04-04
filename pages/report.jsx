import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

// 🔁 FIXED: Relative path to component (no alias)
import ReportForm from '../components/ReportForm';

export default function ReportPage() {
  const { theme } = useTheme();

  return (
    <>
      <Head>
        <title>Submit Crypto Report | LostCryptoHelp</title>
        <meta name="description" content="Submit a crypto scam report anonymously. Get real-time alerts and blockchain validation." />
      </Head>
      <div className={theme === 'dark' ? 'bg-gray-900 text-white min-h-screen' : 'bg-white text-black min-h-screen'}>
        <div className="max-w-3xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold mb-6">Submit a Crypto Report</h1>
          <ReportForm />
        </div>
      </div>
    </>
  );
}
