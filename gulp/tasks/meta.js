module.exports = (gulp, $, config) => {
  const entry = config.paths.meta.entry;
  const dest = config.paths.meta.dest;

  const task = () => gulp.src(entry)
      .pipe($.changed(entry))
      .pipe(gulp.dest(dest))
      ;

  task.description = 'Moves all the meta files to the build';
  return task;
};
