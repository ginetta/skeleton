const webpack = require('webpack');
const path = require('path');
const globEntries = require('webpack-glob-entries');

module.exports = config => ({
  // Here the application starts executing
  // and webpack starts bundling
  // can be string | object {entryname: entrypath} | array
  // we are using an object here (result of `globEntries`)
  entry: globEntries(config.appFiles.scripts),

  // options related to how webpack emits results
  output: {
    // the filename template for entry chunks
    filename: '[name].js',

    // the target directory for all output files
    // must be an absolute path (thus the `path.resolve`)
    path: path.resolve(__dirname, 'build'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },

  // options for resolving module requests
  resolve: {

    // directories where to look for modules
    modules: [
      'node_modules',
      path.join(__dirname, '.'),
      path.resolve(__dirname, 'src'),
    ],
  },

  plugins: [
    // The CommonsChunkPlugin is an opt-in feature that creates a separate file
    // (known as a chunk), consisting of common modules shared between multiple
    // entry points. By separating common modules from bundles, the resulting
    // chunked file can be loaded once initially, and stored in cache for later
    // use. This results in pagespeed optimizations as the browser can quickly
    // serve the shared code from cache, rather than being forced to load a
    // larger bundle whenever a new page is visited.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
    }),

  // Production-Only Plugins
  // (they get concatenated only if we're building for production)
  // See: https://webpack.js.org/guides/production-build/#the-manual-way-configuring-webpack-for-multiple-environments
  ].concat(config.isProd ? [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true,
      },
      comments: false,
    }),
  ] : []),
});
