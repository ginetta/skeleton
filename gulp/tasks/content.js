const merge = require('merge-stream');

module.exports = (gulp, $, config) => {
  const entry = config.paths.content.entryPath;
  const dest = config.paths.content.dest;

  const task = () => {
    // Generate the language file for each language
    // eslint-disable-next-line arrow-body-style
    const contentStreams = config.languages.map((language) => {
      return gulp.src(`${entry}${language}/**/*.yml`)
        .pipe($.concat(`${language}.yml`))
        // TODO: warn when there is a duplicate key
        .pipe(gulp.dest(dest))
        ;
    });

    return merge(contentStreams);
  };

  task.description = 'Concatenates all the content files';
  return task;
};
