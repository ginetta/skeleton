module.exports = (gulp, $, config) => {
  const gulpFiles = config.gulpFiles;

  const task = () =>
    gulp.src(gulpFiles)
      .pipe($.eslint())
      .pipe($.eslint.format())
      ;

  task.description = 'Lints the gulp tasks';
  return task;
};
