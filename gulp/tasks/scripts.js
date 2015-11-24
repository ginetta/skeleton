'use strict';
var stream        = require('../utils/browserSync').stream;

module.exports = function (gulp, $, config) {
  var srcFiles   = config.appFiles.scripts;
  var destPath   = config.paths.scripts.dest;

  var task = function () {
    return gulp.src(srcFiles)
      .pipe($.eslint({envs: ['browser']}))
      .pipe($.eslint.format())
      .pipe(gulp.dest(destPath))
      .pipe(stream());
  };

  task.description = 'Move all javscript files to the build';
  return task;
};
