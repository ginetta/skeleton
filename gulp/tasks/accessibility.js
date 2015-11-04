'use strict';

module.exports = function (gulp, $, config) {
  return function () {
    var srcFiles = config.paths.pages.dest + '**/*.html';

    return gulp.src(srcFiles)
      .pipe($.a11y())
      .pipe($.a11y.reporter())
      .pipe($.accessibility({
        reportLevels: {
          notice: false
        }
      }));
  };
};
