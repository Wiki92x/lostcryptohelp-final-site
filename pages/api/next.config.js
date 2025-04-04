/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Image configuration
  images: {
    domains: ['res.cloudinary.com'],
    unoptimized: true, // Required for static exports
    // Add this to ensure local images work
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Environment variables that should be exposed to the client
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    VERIFY_ETH_ADDRESS: process.env.VERIFY_ETH_ADDRESS,
    VERIFY_BNB_ADDRESS: process.env.VERIFY_BNB_ADDRESS,
    VERIFY_TRON_ADDRESS: process.env.VERIFY_TRON_ADDRESS
  },

  // Output as standalone for better deployment compatibility
  output: 'standalone',

  // Disable x-powered-by header for security
  poweredByHeader: false,

  // Configure redirects if needed
  async redirects() {
    return [];
  },

  // Configure headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
