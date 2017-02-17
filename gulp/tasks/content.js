const merge = require('merge-stream');

module.exports = (gulp, $, config) => {
  const srcFiles = config.paths.content.src;
  const languages = config.languages;
  const destFiles = config.paths.content.dest;

  const task = () => {
    // Generate the language file for each language
    // eslint-disable-next-line arrow-body-style
    const contentStreams = languages.map((language) => {
      return gulp.src(`${srcFiles}${language}/**/*.yml`)
        .pipe($.concat(`${language}.yml`))
        // TODO: warn when there is a duplicate key
        .pipe(gulp.dest(destFiles))
        ;
    });

    return merge(contentStreams);
  };

  task.description = 'Concatenates all the content files';
  return task;
};
