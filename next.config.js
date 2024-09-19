/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
  
    images: {
      unoptimized: true,
     
      remotePatterns: [
        {
          protocol: "https",
          hostname: "lh3.googleusercontent.com",
          port: "",
          pathname: "/a/**",
        },
      ],
    },
  
  };

module.exports = nextConfig;
