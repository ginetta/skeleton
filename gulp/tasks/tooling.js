module.exports = (gulp, $, config) => {
  const entry = config.paths.tooling.all;

  const task = () =>
    gulp.src(entry)
      .pipe($.eslint())
      .pipe($.eslint.format())
      ;

  task.description = 'Lints the tooling files.';
  return task;
};
