/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["jazvpbrjphbkkowjpdth.supabase.co"],
  },
};

module.exports = nextConfig;
