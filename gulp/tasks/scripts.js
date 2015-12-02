'use strict';
var stream  = require('../utils/browserSync').stream;
var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');
var glob = require('glob');

module.exports = function (gulp, $, config) {
  var tasksHelper  = require('../utils/tasksHelpers')(gulp, config);
  var scriptsFiles = config.appFiles.scripts;
  var vendorFile = config.paths.scripts.src + 'vendor.js';
  var srcFiles = glob.sync(scriptsFiles, {ignore: vendorFile});
  var destPath   = config.paths.scripts.dest;
  var skeletonRoot = config.basePaths.root;
  var srcRoot = config.basePaths.src;

  var task = function () {
    return gulp.src(scriptsFiles)
      .pipe($.eslint({envs: ['browser']}))
      .pipe($.eslint.format())
      .pipe(gulpWebpack({
        debug: true, //TODO improve this one we have env depending builds
        entry: {
          main: srcFiles,
          // Add modules you want to load from vendors to this file
          vendor: vendorFile
        },
        output: {
          filename: 'main.js'
        },
        loaders: [
          { test: /\.js$/, loader: 'babel?presets[]=es2015', exclude: /node_modules/}
        ],
        resolve: {
          // Makes sure the paths are relative to the root and not this file
          root: skeletonRoot,
          // Makes sure the compiler looks for modules in /src and node_modules
          modulesDirectories: [srcRoot, 'node_modules']
        },
        plugins: [
          // Makes sure the vendors are only imported once in this seperate file
          new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.min.js')
        ]
      }))
      .pipe(gulp.dest(destPath))
      .pipe(stream());
  };

  task.description = 'Move all javscript files to the build';
  return task;
};
