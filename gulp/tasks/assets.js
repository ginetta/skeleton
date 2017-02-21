module.exports = (gulp, $, config) => {
  const entry = config.skeletonConfig.assets.entry;
  const dest = config.skeletonConfig.assets.dest;
  const manifestFile = config.skeletonConfig.revManifest.dest;

  const task = () => gulp.src(entry)
      .pipe($.changed(dest))
      .pipe($.if(config.isProd, $.rev()))
      .pipe($.if(config.isProd, gulp.dest(dest)))
      .pipe($.if(config.isProd, $.rev.manifest(manifestFile, { merge: true, base: dest })))
      .pipe(gulp.dest(dest))
      ;

  task.description = 'Moves all the assets to the build. While on production, also revs the assets.';
  return task;
};
