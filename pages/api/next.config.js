/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com', 'avatars.githubusercontent.com'],
  },
  output: 'standalone', // Crucial for Netlify or Vercel
  env: {
    BSCSCAN_API_KEY: process.env.BSCSCAN_API_KEY,
    ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
    TRONSCAN_API_KEY: process.env.TRONSCAN_API_KEY,
    VERIFY_BNB_ADDRESS: process.env.VERIFY_BNB_ADDRESS,
    VERIFY_ETH_ADDRESS: process.env.VERIFY_ETH_ADDRESS,
    VERIFY_TRON_ADDRESS: process.env.VERIFY_TRON_ADDRESS,
    VITE_TELEGRAM_BOT_TOKEN: process.env.VITE_TELEGRAM_BOT_TOKEN,
    VITE_TELEGRAM_CHAT_ID: process.env.VITE_TELEGRAM_CHAT_ID,
  },
};

module.exports = nextConfig;
