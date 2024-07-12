/** @type {import('next').NextConfig} */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://ec2-43-202-62-106.ap-northeast-2.compute.amazonaws.com';

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'shopping-phinf.pstatic.net',
      'shop-phinf.pstatic.net',
      't1.kakaocdn.net',
      'k.kakaocdn.net',
      'lh3.googleusercontent.com',
      'review-image-3team.s3.ap-northeast-2.amazonaws.com',
      'profile-image-3team.s3.ap-northeast-2.amazonaws.com',
    ],
    remotePatterns: [
      {
        hostname: '**',
      },
    ],
  },
  sassOptions: {
    includePaths: ['styles'],
    additionalData: `@import "src/styles/globals.scss";`,
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_BASE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
