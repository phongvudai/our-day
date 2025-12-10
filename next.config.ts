import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/our-day';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyBI88qUmWJopFAPGbhDin-xvbFfrTPIhO0",
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "our-day-ad625.firebaseapp.com",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: "our-day-ad625",
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "our-day-ad625.firebasestorage.app",
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "89412211764",
    NEXT_PUBLIC_FIREBASE_APP_ID: "1:89412211764:web:dc4709db2b25c9b1d96661",
  },
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  assetPrefix: basePath,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
