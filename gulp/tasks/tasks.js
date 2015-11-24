'use strict';

module.exports = function (gulp, $, config) {
  var gulpFiles   = config.gulpFiles;

  var task = function () {
    return gulp.src(gulpFiles)
      .pipe($.eslint({envs: ['node']}))
      .pipe($.eslint.format());
  };

  task.description = 'Lints the gulp tasks';
  return task;
};
