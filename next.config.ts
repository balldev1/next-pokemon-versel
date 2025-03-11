import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["raw.githubusercontent.com"], // อนุญาตให้โหลดรูปจาก GitHub
    },
};

export default nextConfig;
