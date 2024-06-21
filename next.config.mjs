/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'review-image-3team.s3.ap-northeast-2.amazonaws.com',
      't1.kakaocdn.net',
      'shopping-phinf.pstatic.net',
      'k.kakaocdn.net',
      'lh3.googleusercontent.com',
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
        destination: 'http://ec2-43-203-126-173.ap-northeast-2.compute.amazonaws.com/:path*',
      },
    ];
  },
};

export default nextConfig;
