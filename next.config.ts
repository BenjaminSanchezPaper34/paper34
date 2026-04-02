import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "**.behold.so",
      },
      {
        protocol: "https",
        hostname: "**.beholdcontent.com",
      },
    ],
  },
};

export default nextConfig;
