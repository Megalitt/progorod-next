const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  async headers() {
    const headers = [];

    headers.push({
      headers: [
        {
          key: 'X-Robots-Tag',
          value: 'noindex',
        },
      ],
      source: '/:path*',
    });
    return headers;
  },
  webpack: (config, { webpack, isServer }) => {
    config.plugins.push(new webpack.DefinePlugin({
      config: JSON.stringify({
        domain: 'https://prochepetsk.ru',
        fs: !isServer ? 'empty' : '',
      }),
    }));
    return config;
  },
  swcMinify: true,
  compress: false,
});
