const _ = require('lodash');
const browserSync = require('../utils/browserSync');

const reload = browserSync.reload;

// eslint-disable-next-line max-statements
module.exports = (gulp, $, config) => {
  const serverBase = config.basePaths.dest;
  const scriptFiles = [config.appFiles.scripts];
  const stylesFiles = [config.appFiles.styles];
  const pagesFiles = [config.appFiles.pages, config.appFiles.layouts];
  const contentSrcFiles = config.appFiles.content;
  const logosFiles = config.appFiles.logos;
  const faviconsFiles = config.appFiles.favicons;
  const imagesFiles = config.appFiles.images;
  const fontsFiles = config.appFiles.fonts;
  const componentsDirs = config.components;

  _.map(componentsDirs, componentDir => scriptFiles.push(`${componentDir}**/*.js`));
  _.map(componentsDirs, componentDir => stylesFiles.push(`${componentDir}**/*.scss`));
  _.map(componentsDirs, componentDir => pagesFiles.push(`${componentDir}**/*.pug`));
  _.map(componentsDirs, componentDir => pagesFiles.push(`${componentDir}**/*.yml`));

  const task = () => {
    // Initialising the server
    browserSync.start(serverBase);

    // Watching Scripts
    gulp.watch(scriptFiles, gulp.parallel('build:scripts'));

    // Watching Styles
    gulp.watch(stylesFiles, gulp.parallel('build:styles'));

    // Watching Pages
    gulp.watch(pagesFiles, gulp.series('build:pages', reload));

    // Watching Content
    gulp.watch(contentSrcFiles, gulp.series('build:content', 'build:pages', reload));

    // // Watching Assets
    gulp.watch([logosFiles, faviconsFiles, imagesFiles, fontsFiles], gulp.parallel('build:assets'));
  };

  task.description = 'Serve the build folder';
  return task;
};
