const stream = require('../utils/browserSync').stream;
const handleError = require('../utils/handleError');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const webpackConfig = require('../../webpack.config');

module.exports = (gulp, $, config) => {
  const scriptsFiles = config.appFiles.scripts;
  const destPath = config.paths.scripts.dest;
  const manifestFile = config.paths.revManifest.dest;

  const task = () =>
    gulp.src(scriptsFiles)
      .pipe($.plumber(handleError))
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe(gulpWebpack(webpackConfig(config), webpack))
      .pipe($.if(config.isProd, $.rev()))
      .pipe($.if(config.isProd, gulp.dest(destPath)))
      .pipe($.if(config.isProd, $.rev.manifest(manifestFile, {
        merge: true,
        base: destPath,
      })))
      .pipe(gulp.dest(destPath))
      .pipe(stream())
      ;

  task.description = 'Move all javscript files to the build';
  return task;
};
