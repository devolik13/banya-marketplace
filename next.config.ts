import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Только те адреса, с которых сайт реально берёт картинки.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "slelguoygbfzlpylpxfs.supabase.co" },
    ],
  },
};

export default nextConfig;
