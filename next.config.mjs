/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "darkgrey-eland-667117.hostingersite.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
