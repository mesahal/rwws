/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  images: {
    domains: [
      "images.unsplash.com", // Allow Unsplash images
      "localhost", // Local development
      "rwws.vercel.app",
      "demo.rwws.org.bd",
    ], // Production deployment
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      ignored: ["**/node_modules/**", "**/.next/**"],
    };
    return config;
  },
  // Add trailing slashes to URLs
  trailingSlash: true,
  // Enable static compression
  compress: true,
  // Increase build cache
  experimental: {
    appDir: false, // If using the old pages router
    turbotrace: {
      logLevel: "error",
    },
  },
  // Handle 404 errors
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "/404",
        permanent: false,
        has: [
          {
            type: "header",
            key: "x-not-found",
            value: "true",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
