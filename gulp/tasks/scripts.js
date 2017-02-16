'use strict';
var stream  = require('../utils/browserSync').stream;
var handleError   = require('../utils/handleError');
var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');
var webpackConfig = require('../../webpack.config');

module.exports = function (gulp, $, config) {
  var scriptsFiles = config.appFiles.scripts;
  var destPath     = config.paths.scripts.dest;
  var manifestFile = config.paths.revManifest.dest;



  var task = function () {
    return gulp.src(scriptsFiles)
      .pipe($.plumber(handleError))
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe(gulpWebpack(webpackConfig(config), webpack))
      .pipe($.if(config.isProd, $.rev()))
      .pipe($.if(config.isProd, gulp.dest(destPath)))
      .pipe($.if(config.isProd, $.rev.manifest(manifestFile, { merge: true, base: destPath })))
      .pipe(gulp.dest(destPath))
      .pipe(stream());
  };

  task.description = 'Move all javscript files to the build';
  return task;
};
