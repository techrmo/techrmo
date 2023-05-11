/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'shared', 'scss')],
  },
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/docs',
        destination: '/docs/index.html',
      },
    ];
  },
};

module.exports = nextConfig;
