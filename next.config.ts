import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'pt', 'es'], 
    defaultLocale: 'pt',
  },
};

export default nextConfig;
