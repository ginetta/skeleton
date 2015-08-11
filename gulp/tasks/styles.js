'use strict';
var stream        = require('../utils/browserSync').stream;
var handleError   = require('../utils/handleError');

module.exports = function (gulp, $, config) {
  var srcFiles   = config.appFiles.styles;
  var destFiles  = config.paths.styles.dest;
  var destFilesGenerated  = config.paths.styles.generated;
  var bowerFiles = config.basePaths.bower;

  return function () {
    return gulp.src(srcFiles)
      .pipe($.plumber(handleError))
      .pipe($.cssGlobbing({
        extensions: ['.scss']
      }))
      .pipe($.sourcemaps.init())
      .pipe($.sass({includePaths: [bowerFiles, destFilesGenerated]}))
      .pipe($.autoprefixer({browsers: ['last 2 versions', 'ie 9']}))
      .pipe($.sourcemaps.write({includeContent: true}))
      .pipe(gulp.dest(destFiles))
      .pipe(stream({match: '**/*.css'}));
  };
};
