module.exports = {
  reactStrictMode: true,
  async rewrites() {

    return [

      {

        source: '/api/:path*',

        destination: 'http://127.0.0.1:3000/:path*', // Proxy to Backend

      },

    ]

  },
};
