
const webpack = require('webpack');

module.exports = function override(config, env) {

  config.resolve.fallback = {
    ...config.resolve.fallback,
    "path": require.resolve("path-browserify"),
    "net": false,
    "fs": false,
    "tls": false,
    "crypto": false,
    "zlib": false,
    "querystring": require.resolve("querystring-es3"),
    "url": require.resolve("url"),
    "http": require.resolve("http-browserify"),
    "buffer": require.resolve("buffer"),
    "stream": require.resolve("stream-browserify"),
    "util": require.resolve("util"),
    // Add other fallbacks as needed
  };

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
      stream: 'stream-browserify',
      util: 'util',
    })
  ]);

  console.log("Modified Webpack Config:", config);
  return config;
};