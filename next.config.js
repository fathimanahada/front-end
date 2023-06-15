module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8086',
        pathname: '/get_image/**',
      },
    ],
  },
  async rewrites() {

    return [

      {

        source: '/api/:path*',

        destination: 'http://127.0.0.1:3000/:path*', // Proxy to Backend

      },

    ]

  }
};
