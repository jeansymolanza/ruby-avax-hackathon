/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'ipfs.nftrade.com',
      'res.cloudinary.com',
      'ipfs.infura.io',
      'ipfs.io',
      'the-u.club',
      'lh3.googleusercontent.com',
      'assets.nftrade.com',
    ],
  },
};

module.exports = nextConfig;
