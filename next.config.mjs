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
        source: `${process.env.NEXT_PUBLIC_FRONT_API_BASE_URL}/:path*`,
        destination: `${process.env.NEXT_PUBLIC_BACK_API_BASE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
