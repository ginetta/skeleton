'use strict';
var merge = require('merge-stream');

module.exports = function (gulp, $, config) {
  var imagesSrc    = config.appFiles.images;
  var imagesDest   = config.paths.images.dest;
  var logosSrc     = config.appFiles.logos;
  var logosDest    = config.paths.logos.dest;
  var faviconsSrc  = config.appFiles.favicons;
  var faviconsDest = config.paths.favicons.dest;
  var fontsSrc     = config.appFiles.fonts;
  var fontsDest    = config.paths.fonts.dest;
  var manifestFile = config.paths.revManifest.dest;

  var task =  function () {
    var imagesSt = gulp.src(imagesSrc)
      .pipe($.changed(imagesDest))
      .pipe($.if(config.isProd, $.rev()))
      .pipe($.if(config.isProd, gulp.dest(imagesDest)))
      .pipe($.if(config.isProd, $.rev.manifest(manifestFile, { merge: true, base: imagesDest })))
      .pipe(gulp.dest(imagesDest))
      ;

    var logosSt = gulp.src(logosSrc)
      .pipe($.changed(logosSrc))
      .pipe($.if(config.isProd, $.rev()))
      .pipe($.if(config.isProd, gulp.dest(logosSrc)))
      .pipe($.if(config.isProd, $.rev.manifest(manifestFile, { merge: true, base: logosDest })))
      .pipe(gulp.dest(logosDest));

    var faviconsSt = gulp.src(faviconsSrc)
      .pipe($.changed(faviconsSrc))
      .pipe(gulp.dest(faviconsDest));

    var fontsSt = gulp.src(fontsSrc)
      .pipe($.changed(fontsSrc))
      .pipe(gulp.dest(fontsDest));

    return merge(imagesSt, logosSt, faviconsSt, fontsSt);
  };

  task.description = 'Moves all the assets to the build';
  return task;
};
