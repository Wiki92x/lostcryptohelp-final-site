import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <div className="min-h-screen bg-gray-900 text-white dark:bg-white dark:text-black transition-colors duration-300">
        <Navbar />
        <main className="px-4 pt-16"> {/* Added pt-16 for navbar spacing */}
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
