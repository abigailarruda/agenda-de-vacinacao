/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/agendas',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
