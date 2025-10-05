import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* other config options here */
  serverActions: {
    bodySizeLimit: "10mb", // allow request bodies up to 10 MB
  },
};

export default nextConfig;
