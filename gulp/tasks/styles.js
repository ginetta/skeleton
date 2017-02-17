const fs = require('fs');
const stream = require('../utils/browserSync').stream;
const handleError = require('../utils/handleError');

module.exports = (gulp, $, config) => {
  const srcFiles = config.appFiles.styles;
  const destFiles = config.paths.styles.dest;
  // previously rev files such as assets that might have been referenced
  // in the styles (and their path needs to be updated)
  const manifestFile = config.paths.revManifest.dest;

  const task = () =>
    gulp.src(srcFiles)
      .pipe($.plumber(handleError))
      .pipe($.cssGlobbing({
        extensions: ['.scss'],
      }))
      .pipe($.if(!config.isProd, $.sourcemaps.init()))
      .pipe($.sass({
        includePaths: ['node_modules'],
        outputStyle: config.isProd ? 'compressed' : '',
      }))
      .pipe($.autoprefixer({ browsers: ['last 2 versions', 'ie 9'] }))
      .pipe($.if(!config.isProd, $.sourcemaps.write({ includeContent: true })))
      .pipe($.if(config.isProd, $.revReplace({
        manifest: fs.existsSync(manifestFile) && gulp.src(manifestFile),
      })))
      .pipe($.if(config.isProd, $.rev()))
      .pipe($.if(config.isProd, gulp.dest(destFiles)))
      .pipe($.if(config.isProd, $.rev.manifest(manifestFile, {
        merge: true,
        base: destFiles,
      })))
      .pipe(gulp.dest(destFiles))
      .pipe(stream({ match: '**/*.css' }))
      ;

  task.description = 'Generate all stylesheets from the sass files';
  return task;
};
