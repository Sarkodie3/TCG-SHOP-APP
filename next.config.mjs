/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
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
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/collections/pokemon-booster-box",
        destination: "/collections/pokemon-boxes",
        permanent: true,
      },
      {
        source: "/collections/onepiece-boxes",
        destination: "/collections/onepiece-booster-box",
        permanent: true,
      },
      {
        source: "/yugioh",
        destination: "/yughi-oh",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
