const merge = require('merge-stream');

module.exports = (gulp, $, config) => {
  const imagesSrc = config.appFiles.images;
  const imagesDest = config.paths.images.dest;
  const logosSrc = config.appFiles.logos;
  const logosDest = config.paths.logos.dest;
  const faviconsSrc = config.appFiles.favicons;
  const faviconsDest = config.paths.favicons.dest;
  const fontsSrc = config.appFiles.fonts;
  const fontsDest = config.paths.fonts.dest;
  const manifestFile = config.paths.revManifest.dest;

  const task = () => {
    const imagesSt = gulp.src(imagesSrc)
      .pipe($.changed(imagesDest))
      .pipe($.if(config.isProd, $.rev()))
      .pipe($.if(config.isProd, gulp.dest(imagesDest)))
      .pipe($.if(config.isProd, $.rev.manifest(manifestFile, { merge: true, base: imagesDest })))
      .pipe(gulp.dest(imagesDest))
      ;

    const logosSt = gulp.src(logosSrc)
      .pipe($.changed(logosSrc))
      .pipe($.if(config.isProd, $.rev()))
      .pipe($.if(config.isProd, gulp.dest(logosSrc)))
      .pipe($.if(config.isProd, $.rev.manifest(manifestFile, { merge: true, base: logosDest })))
      .pipe(gulp.dest(logosDest));

    const faviconsSt = gulp.src(faviconsSrc)
      .pipe($.changed(faviconsSrc))
      .pipe(gulp.dest(faviconsDest));

    const fontsSt = gulp.src(fontsSrc)
      .pipe($.changed(fontsSrc))
      .pipe(gulp.dest(fontsDest));

    return merge(imagesSt, logosSt, faviconsSt, fontsSt);
  };

  task.description = 'Moves all the assets to the build';
  return task;
};
