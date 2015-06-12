'use strict';
var gulp        = require('gulp-help')(require('gulp'), {description: false});
var config      = require('./gulp/config')();
var runSequence = require('run-sequence');
var t           = require('./gulp/utils/tasksHelpers')(gulp);

t.configure(config);

//////////
// Main //
//////////
gulp.task('default',
          'Build and serve the app',
          ['serve', 'tasks']);

gulp.task('build',
          'Build the app',
          function(cb) {
            runSequence('clean',
                        ['build:pages', 'build:assets', 'build:styles', 'build:scripts'],
                        cb);
          });

gulp.task('serve',
          'Serve the build folder',
          ['build'],
          t.getTask('serve'));


///////////////
// Secondary //
///////////////

// Move all javscript files to the build
gulp.task('build:scripts',
          false,
          t.getTask('scripts'));

// Generate all stylesheets from the sass files
gulp.task('build:styles',
          false,
          t.getTask('styles'));

// Concatenates all the content files
gulp.task('build:content',
          false,
          t.getTask('content'));

// Generate all pages from the jade files
gulp.task('build:pages',
          false,
          ['build:content'],
          t.getTask('pages'));

// Moves all the assets to the build
gulp.task('build:assets',
          false,
          t.getTask('assets'));

// Cleans the build folder
gulp.task('clean',
          false,
          t.getTask('clean'));

// Lints the gulp tasks
gulp.task('tasks',
          false,
          t.getTask('tasks'));
