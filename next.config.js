/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'ipfs.nftrade.com',
      'res.cloudinary.com',
      'ipfs.infura.io',
      'the-u.club',
    ],
  },
};

module.exports = nextConfig;
