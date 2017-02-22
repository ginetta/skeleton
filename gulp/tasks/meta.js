module.exports = (gulp, $, config) => {
  const metaSrc = config.appFiles.meta;
  const metaDest = config.paths.meta.dest;

  const task = () => gulp.src(metaSrc)
      .pipe($.changed(metaSrc))
      .pipe(gulp.dest(metaDest))
      ;

  task.description = 'Moves all the meta files to the build';
  return task;
};
