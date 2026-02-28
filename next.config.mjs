import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode : false,
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

export default withNextIntl(nextConfig);
