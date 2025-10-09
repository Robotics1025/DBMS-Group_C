import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* other config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // allow request bodies up to 10 MB
    },
  },
};

export default nextConfig;
