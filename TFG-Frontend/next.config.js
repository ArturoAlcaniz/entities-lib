module.exports = {
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "x-frame-options",
            value: "SAMEORIGIN",
          },
          {
            key: "x-content-type-options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: "http://TFG-Backend:3020/:path*",
      },
    ];
  },
  poweredByHeader: false,
};
