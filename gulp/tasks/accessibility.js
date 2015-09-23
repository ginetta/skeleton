'use strict';

module.exports = function (gulp, $, config) {
  var srcFiles = config.appFiles.pagesHtml;
  return function () {
    return gulp.src(srcFiles)
      .pipe($.a11y())
      .pipe($.a11y.reporter())
      .pipe($.accessibility());
  };
};
