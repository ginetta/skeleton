'use strict';
var merge      = require('merge-stream');

module.exports = function (gulp, $, config) {
  return function () {
    var srcFiles  = config.paths.content.src;
    var languages = config.languages;
    var destFiles = config.paths.content.dest;

    // Generate the language file for each language
    var contentStreams = languages.map(function(language) {
      return gulp.src(srcFiles + language + '/**/*.yml')
              .pipe($.concat(language + '.yml'))
              // TODO: warn when there is a duplicate key
              .pipe(gulp.dest(destFiles));
    });

    return merge(contentStreams);
  };
};
