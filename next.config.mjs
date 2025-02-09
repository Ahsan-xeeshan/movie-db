/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
      {
        protocol: "http",
        hostname: "facebook.com",
      },
      {
        protocol: "http",
        hostname: "x.com",
      },
      {
        protocol: "http",
        hostname: "linkedin.com",
      },
    ],
  },
};

export default nextConfig;
