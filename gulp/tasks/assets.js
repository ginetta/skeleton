const path = require('path');

module.exports = (gulp, $, config) => {
  const assetsSrc = config.appFiles.assets;
  const assetsDest = config.paths.assets.dest;
  const manifestFile = config.paths.revManifest.dest;

  const task = () => gulp.src(assetsSrc)
      .pipe($.changed(assetsDest))
      .pipe($.if(config.isProd, $.rev()))
      .pipe($.if(config.isProd, gulp.dest(assetsDest)))
      .pipe($.if(config.isProd, $.rev.manifest(manifestFile, { merge: true, base: assetsDest })))
      .pipe(gulp.dest(assetsDest))
      ;

  task.description = 'Moves all the assets to the build. While on production, also revs the assets.';
  return task;
};
