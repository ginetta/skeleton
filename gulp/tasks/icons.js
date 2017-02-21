module.exports = (gulp, $, config) => {
  const entryGlob = config.entryGlobs.icons;
  const destPath = config.destPaths.icons;
  const manifestDestPath = config.destPaths.revManifest;

  const task = () => gulp.src(entryGlob)
      .pipe($.svgSprite({
        mode: {
          symbol: {
            dest: '',
            sprite: 'sprite.svg',
          },
        }
      }))
      .pipe($.if(config.isProd, $.rev()))
      .pipe($.if(config.isProd, gulp.dest(destPath)))
      .pipe($.if(config.isProd, $.rev.manifest(manifestDestPath, { merge: true, base: destPath })))
      .pipe(gulp.dest(destPath))
      ;

  task.description = 'Generates an SVG sprite out of svg icons';
  return task;
};
