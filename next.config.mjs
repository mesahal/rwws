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
};

export default nextConfig;
