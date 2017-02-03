'use strict';
var stream  = require('../utils/browserSync').stream;
var handleError   = require('../utils/handleError');
var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');
var webpackConfig = require('../../webpack.config');

module.exports = function (gulp, $, config) {
  var scriptsFiles = config.appFiles.scripts;
  var destPath     = config.paths.scripts.dest;

  const isProd = process.env.NODE_ENV === 'production';

  var task = function () {
    return gulp.src(scriptsFiles)
      .pipe($.plumber(handleError))
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe(gulpWebpack(webpackConfig(config), webpack))
      .pipe(gulp.dest(destPath))
      .pipe($.if(isProd, $.rev()))
      .pipe($.if(isProd, gulp.dest(destPath)))
      .pipe($.if(isProd, $.rev.manifest()))
      .pipe($.if(isProd, gulp.dest(destPath)))
      .pipe(stream());
  };

  task.description = 'Move all javscript files to the build';
  return task;
};
