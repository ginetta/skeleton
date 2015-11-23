'use strict';
var stream        = require('../utils/browserSync').stream;
var handleError   = require('../utils/handleError');

module.exports = function (gulp, $, config) {
  var srcFiles   = config.appFiles.styles;
  var destFiles  = config.paths.styles.dest;

  var task = function () {
    return gulp.src(srcFiles)
      .pipe($.plumber(handleError))
      .pipe($.cssGlobbing({
        extensions: ['.scss']
      }))
      .pipe($.sourcemaps.init())
      .pipe($.sass({includePaths: ['node_modules']}))
      .pipe($.autoprefixer({browsers: ['last 2 versions', 'ie 9']}))
      .pipe($.sourcemaps.write({includeContent: true}))
      .pipe(gulp.dest(destFiles))
      .pipe(stream({match: '**/*.css'}));
  };

  task.description = 'Generate all stylesheets from the sass files';
  return task;
};
