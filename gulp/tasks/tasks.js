'use strict';

module.exports = function (gulp, $, config) {
  return function () {
  var gulpFiles   = config.gulpFiles;

    return gulp.src(gulpFiles)
      .pipe($.eslint({envs: ['node']}))
      .pipe($.eslint.format());
  };
};
