import type { NextConfig } from "next";
import os from "os"

const ip = process.env.NODE_ENV === "development" && Object.values(os.networkInterfaces()).flat().find((i) => i?.family === "IPv4" && !i.internal)?.address as string

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '3mb',
    },
  },
  allowedDevOrigins: [ip?.toString()],
  /* config options here */
};

export default nextConfig;
