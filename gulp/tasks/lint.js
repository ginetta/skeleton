const merge = require('merge-stream');

module.exports = (gulp, $, config) => {
  const toolingGlob = config.entryGlobs.tooling;
  const scriptsGlobs = config.watchGlobs.scripts;
  const stylesGlobs = config.watchGlobs.styles;

  const task = () => {
    const scriptsStream = gulp.src(toolingGlob.concat(scriptsGlobs))
      .pipe($.eslint())
      .pipe($.eslint.format())
      ;

    const stylesStream = gulp.src(stylesGlobs)
      .pipe($.stylelint({
        reporters: [
          { formatter: 'string', console: true }
        ]
      }));

    return merge(scriptsStream, stylesStream);
  };

  task.description = 'Lints script and styles.';
  return task;
};
