import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "api.microlink.io", // Microlink Image Preview
      "opengraph.githubassets.com", // GitHub Open Graph previews
    ],
  },
};

export default nextConfig;
