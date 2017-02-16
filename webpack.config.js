'use strict';

const webpack = require('webpack');
const path = require('path');
const globEntries = require('webpack-glob-entries')

module.exports = config => {
  return {
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
      path: path.resolve(__dirname, 'build')
    },


    // options for resolving module requests
    resolve: {

      // directories where to look for modules
      modules: [
        'node_modules',
        path.join(__dirname, '.'),
        path.resolve(__dirname, 'src')
      ]
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
        filename: 'vendor.min.js',
      })
    ]
  };
};
