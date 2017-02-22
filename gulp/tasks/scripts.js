const path = require('path');
const stream = require('../utils/browserSync').stream;
const handleError = require('../utils/handleError');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const named = require('vinyl-named');
const webpackConfig = require('../../webpack.config');


module.exports = (gulp, $, config) => {
  const entry = config.paths.scripts.entry;
  const dest = config.paths.scripts.dest;
  const manifestFile = config.paths.revManifest.dest;

  console.log(webpackConfig(config).entry);
  console.log('dest', dest);

  const task = () =>
    gulp.src(entry, { base: 'src/layouts' })
      .pipe($.plumber(handleError))
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe(named((file) => {
        const filename = path.basename(file.path, path.extname(file.path));
        if (filename === 'vendor' || filename === 'index') {
          return filename;
        }
        const fileFolder = path.dirname(file.path);
        return fileFolder.slice(fileFolder.lastIndexOf('/') + 1);
      }))
      .pipe(gulpWebpack(webpackConfig(config), webpack))
      .pipe($.if(config.isProd, $.rev()))
      .pipe($.if(config.isProd, gulp.dest(dest)))
      .pipe($.if(config.isProd, $.rev.manifest(manifestFile, {
        merge: true,
        base: dest,
      })))
      .pipe(gulp.dest(dest))
      .pipe(stream())
      ;

  task.description = 'Move all javscript files to the build';
  return task;
};
