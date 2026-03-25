/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/images/**",
      },
      {
        pathname: "/Images/**",
      },
      {
        pathname: "/Images/hero/hero.png",
        search: "?v=20260322",
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
