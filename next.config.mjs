/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // Ignore 'fs' for client-side
    };
    return config;
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

export default nextConfig;
