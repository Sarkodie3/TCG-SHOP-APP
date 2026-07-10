/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "omotenashitcg.com",
        pathname: "/cdn/shop/**",
      },
      {
        protocol: "http",
        hostname: "omotenashitcg.com",
        pathname: "/cdn/shop/**",
      },
    ],
  },
};

export default nextConfig;
