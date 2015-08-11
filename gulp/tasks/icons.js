'use strict';
var handleError   = require('../utils/handleError');

module.exports = function (gulp, $, config) {
  var srcFiles   = config.icons.src;
  var scsstpl   = config.icons.scsstpl;
  var svgDest  = config.icons.dest.svg;
  var svgDestFile  = config.icons.dest.svgFile;
  var scssDest  = config.icons.dest.scss;

  return function () {
    return gulp.src(srcFiles)
      .pipe($.plumber(handleError))
      .pipe($.svgSprite({
        'shape': {
          transform: ['svgo'],
          maxWidth: 24,
          maxHeight: 24,
          padding: 10,
          // makes sure the optimized icons are copied into the assets folder
          dest: svgDest
        },
        'mode': {
          'css': {
            'dest': './',
            'layout': 'vertical',
            'sprite': svgDestFile,
            'bust': false,
            'render': {
              'scss': {
                'dest': scssDest,
                'template': scsstpl
              }
            }
          }
        }
      }))
      .pipe(gulp.dest('./'));
  };
};
