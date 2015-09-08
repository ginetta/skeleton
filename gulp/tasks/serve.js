'use strict';
var browserSync = require('../utils/browserSync');
var reload      = browserSync.reload;
var _           = require('lodash');

module.exports = function (gulp, $, config) {
  var serverBase       = config.basePaths.dest;
  var scriptFiles      = [config.appFiles.scripts];
  var stylesFiles      = [config.appFiles.styles];
  var pagesFiles       = [config.appFiles.pages];
  var contentSrcFiles  = config.appFiles.content;
  var gulpFiles        = config.gulpFiles;
  var logosFiles       = config.appFiles.logos;
  var faviconsFiles    = config.appFiles.favicon;
  var imagesFiles      = config.appFiles.images;
  var fontsFiles       = config.appFiles.fonts;

  var componentsDirs   = config.components;

  _.map(componentsDirs, function(componentDir) {
                              stylesFiles.push(componentDir + '**/*.scss');
                            });
  _.map(componentsDirs, function(componentDir) {
                              pagesFiles.push(componentDir + '**/*.jade');
                            });
  _.map(componentsDirs, function(componentDir) {
                              pagesFiles.push(componentDir + '**/*.yml');
                            });

  return function () {
    // Initialising the server
    browserSync.start(serverBase);

    // Watching Scripts
    gulp.watch(scriptFiles, ['build:scripts']);

    // Watching Styles
    gulp.watch(stylesFiles, ['build:styles']);

    // Watching Pages
    gulp.watch(pagesFiles, ['build:pages', reload]);

    // Watching Content
    gulp.watch(contentSrcFiles, ['build:pages', reload]);

    // Watching Assets
    gulp.watch(logosFiles, ['build:assets']);
    gulp.watch(faviconsFiles, ['build:assets']);
    gulp.watch(imagesFiles, ['build:assets']);
    gulp.watch(fontsFiles, ['build:assets']);

    // Watch Gulp tasks
    gulp.watch(gulpFiles, ['serve']);
  };
};
