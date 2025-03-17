/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com", // Allow Unsplash images
      "localhost", // Local development
      "rwws.vercel.app",
    ], // Production deployment
  },
};

export default nextConfig;
