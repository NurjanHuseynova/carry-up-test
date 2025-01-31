import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://carryforustest-001-site1.jtempurl.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
