'use strict';
var stream        = require('../utils/browserSync').stream;

module.exports = function (gulp, $, config) {

  return function () {
    var srcFiles   = config.appFiles.scripts;
    var destPath   = config.paths.scripts.dest;

    return gulp.src(srcFiles)
      .pipe($.eslint({envs: ['browser']}))
      .pipe($.eslint.format())
      .pipe(gulp.dest(destPath))
      .pipe(stream());
  };
};
