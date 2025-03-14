/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "carryforustest-001-site1.jtempurl.com",
      },
    ],
    formats: ["image/webp"],
  },
};

export default nextConfig;