const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      fs: false,
      zlib: require.resolve('browserify-zlib'),
      http: require.resolve('stream-http')
    }
  },
  node: {
    global: true,
    fs: 'empty',
    crypto: 'empty',
    tls: 'empty',
    net: 'empty'
  }
};






