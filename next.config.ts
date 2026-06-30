import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "192.168.0.18",
    "http://192.168.0.18:3000",
  ],
};

export default nextConfig;