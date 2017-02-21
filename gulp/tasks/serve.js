const _ = require('lodash');
const browserSync = require('../utils/browserSync');

const reload = browserSync.reload;

// eslint-disable-next-line max-statements
module.exports = (gulp, $, config) => {
  const scripts = config.skeletonConfig.scripts.all;
  const styles = config.skeletonConfig.styles.all;
  const pages = config.skeletonConfig.pages.all;
  const content = config.skeletonConfig.content.all;
  const assets = config.skeletonConfig.assets.all;
  const meta = config.skeletonConfig.meta.all;
  const server = config.skeletonConfig.base.dest;

  const task = () => {
    // Initialising the server
    browserSync.start(server);

    // Watching Scripts
    gulp.watch(scripts, gulp.parallel('build:scripts'));

    // Watching Styles
    gulp.watch(styles, gulp.parallel('build:styles'));

    // Watching Pages
    gulp.watch(pages, gulp.series('build:pages', reload));

    // Watching Content
    gulp.watch(content, gulp.series('build:content', 'build:pages', reload));

    // Watching Assets
    gulp.watch(assets, gulp.parallel('build:assets'));

    // Watching Meta
    gulp.watch(meta, gulp.parallel('build:meta'));
  };

  task.description = 'Serve the build folder';
  return task;
};
