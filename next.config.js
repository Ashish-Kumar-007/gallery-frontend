/** @type {import('next').NextConfig} */
const withImages = require('next-images');

const nextConfig = withImages({
  images: {
    domains: ['res.cloudinary.com'], // Add your Cloudinary hostname here
  },
  reactStrictMode: true,
});

module.exports = nextConfig;



module.exports = nextConfig
