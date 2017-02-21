const merge = require('merge-stream');
const configHelpers = require('../utils/configHelpers');

module.exports = (gulp, $, config) => {
  const entryPath = config.paths.content.entryPath;
  const dest = config.paths.content.dest;

  const task = () => {
    const languages = configHelpers.getAvailableLanguages(config);

    // Generate the language file for each language
    // eslint-disable-next-line arrow-body-style
    const contentStreams = languages.map((language) => {
      return gulp.src(`${entryPath}${language}/**/*.yml`)
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
