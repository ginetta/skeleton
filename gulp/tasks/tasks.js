'use strict';

module.exports = function (gulp, $, config) {
  var gulpFiles   = config.gulpFiles;

  return function () {
    return gulp.src(gulpFiles)
      .pipe($.eslint({envs: ['node']}))
      .pipe($.eslint.format());
  };
};
