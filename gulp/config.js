'use strict';
var argv = require('yargs').argv;
var path = require('path');

module.exports = function () {

  var basePaths = {
    root:    path.join(__dirname, '..'),
    src:     'src/',
    content: 'content/',
    assets:  'assets/',
    dest:    'build/',
    tmp:     '.tmp/'
  };

  var languages = ['en'];

  var paths = {
    scripts: {
      src:  basePaths.src + '4.layouts/',
      dest: basePaths.dest + 'js/'
    },
    styles: {
      src:  [basePaths.src + '4.layouts/', basePaths.src + '5.pages/'],
      dest: basePaths.dest + 'css/'
    },
    content: {
      src:  basePaths.content + 'texts/',
      dest: basePaths.dest + 'content/texts/'
    },
    pages: {
      src:  basePaths.src + '5.pages/',
      dest: basePaths.dest
    },
    layouts: {
      src:  basePaths.src + '4.layouts/'
    },
    elements: {
      src:  basePaths.src + '2.elements/'
    },
    modules: {
      src:  basePaths.src + '3.modules/'
    },
    images: {
      src:  basePaths.content + 'images/',
      dest: basePaths.dest + 'content/images/'
    },
    logos: {
      src:  basePaths.assets + 'logos/',
      dest: basePaths.dest + 'assets/logos/'
    },
    favicons: {
      src:  basePaths.assets + 'favicons/',
      dest: basePaths.dest
    },
    fonts: {
      src:  basePaths.assets + 'fonts/',
      dest: basePaths.dest + 'assets/fonts/'
    }
  };

  var appFiles = {
    scripts:   paths.scripts.src + '**/*.js',
    styles:    paths.styles.src.map(function (p) { return p + '**/*.scss'; }),
    content:   paths.content.src + '**/*.yml',
    pages:     paths.pages.src + '**/*.jade',
    layouts:   paths.layouts.src + '**/*.jade',
    images:    paths.images.src + '**/*',
    logos:     paths.logos.src + '**/*',
    favicons:  paths.favicons.src + '**/*',
    fonts:     paths.fonts.src + '**/*'
  };

  var gulpFiles = [
    'gulp/**/*.js',
    'gulpfile.js'
  ];

  var environments = {
    testing: {
      host:        argv.host,
      username:    argv.username,
      projectPath: 'preview.ginetta.net/skeleton/', // 'client.ginetta.net/project-name/'
      releasePath: argv.path,
      privateKey:  argv.privateKey
    }
  };

  return {
    basePaths:    basePaths,
    languages:    languages,
    paths:        paths,
    appFiles:     appFiles,
    gulpFiles:    gulpFiles,
    environments: environments
  };
};
