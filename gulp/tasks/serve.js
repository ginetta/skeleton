'use strict';
var browserSync = require('../utils/browserSync');
var reload = browserSync.reload;

var _           = require('lodash');

module.exports = function (gulp, $, config) {
  var serverBase       = config.basePaths.dest;
  var contentSrcFiles  = config.appFiles.content;
  var gulpFiles        = config.gulpFiles;
  var logosFiles       = config.appFiles.logos;
  var faviconsFiles    = config.appFiles.favicons;
  var imagesFiles      = config.appFiles.images;
  var fontsFiles       = config.appFiles.fonts;
  var componentsDirs   = config.components;

  _.map(componentsDirs, function(componentDir) {
                              scriptFiles.push(componentDir + '**/*.js');
                            });
  _.map(componentsDirs, function(componentDir) {
                              stylesFiles.push(componentDir + '**/*.scss');
                            });
  _.map(componentsDirs, function(componentDir) {
                              pagesFiles.push(componentDir + '**/*.jade');
                            });
  _.map(componentsDirs, function(componentDir) {
                              pagesFiles.push(componentDir + '**/*.yml');
                            });

  var task = function () {
    // Initialising the server
    browserSync.start(serverBase);

    // Watching Scripts
    gulp.watch('src/**/*.js', gulp.parallel('build:scripts'));

    // Watching Styles
    gulp.watch('src/**/*.scss', gulp.parallel('build:styles'));

    // Watching Pages
    gulp.watch('src/**/*.jade', gulp.series('build:pages', reload));

    // Watching Content
    gulp.watch(contentSrcFiles, gulp.series('build:content', 'build:pages', reload));

    // // Watching Assets
    gulp.watch([logosFiles, faviconsFiles, imagesFiles, fontsFiles], gulp.parallel('build:assets'));
  };

  task.description = 'Serve the build folder';
  return task;
};
