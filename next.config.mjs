/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['styles'],
    additionalData: `@import "src/styles/globals.scss";`,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.chosun.com',
      },
    ],
  },
};

export default nextConfig;
