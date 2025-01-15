/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
  output: "export",
  distDir: "out", // Specifies the output directory
  experimental: {
    appDir: true, // Enable the app directory (Next.js 13+ feature)
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
    // unoptimized: true, // Required for static export
  },
  assetPrefix: "./",
  basePath: "",
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // Ignore 'fs' for client-side
    };
    return config;
  },
  // async headers() {
  //   return [
  //     {
  //       // Match all API routes
  //       source: "/api/:path*", // Matches any route starting with /api/
  //       headers: [
  //         {
  //           key: "Access-Control-Allow-Origin",
  //           value: "*",
  //         },
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "GET, POST, PUT, DELETE, OPTIONS",
  //         },
  //         {
  //           key: "Access-Control-Allow-Headers",
  //           value: "Content-Type, Authorization",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
