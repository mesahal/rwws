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
  experimental: {
    appDir: false, // If using the old pages router
  },
};

export default nextConfig;
