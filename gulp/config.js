'use strict';
var argv = require('yargs').argv;

module.exports = function () {

  var basePaths = {
    src:     'src/',
    content: 'content/',
    assets:  'assets/',
    dest:    'build/',
    tmp:     '.tmp/'
  };

  var languages = ['en'];

  var paths = {
    scripts: {
      src:  basePaths.src + 'scripts/',
      dest: basePaths.dest + 'js/'
    },
    styles: {
      src:  basePaths.src + 'styles/',
      dest: basePaths.dest + 'css/'
    },
    content: {
      src:  basePaths.content + 'texts/',
      dest: basePaths.dest + 'content/texts/'
    },
    pages: {
      src:  basePaths.src + 'pages/',
      dest: basePaths.dest
    },
    layouts: {
      src:  basePaths.src + 'layouts/'
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
    styles:    paths.styles.src + '**/*.scss',
    content:   paths.content.src + '**/*.yml',
    pages:     paths.pages.src + '**/*.jade',
    layouts:   paths.layouts.src + '**/*.jade',
    images:    paths.images.src + '**/*',
    logos:     paths.logos.src + '**/*',
    favicons:  paths.favicons.src + '**/*',
    fonts:     paths.fonts.src + '**/*'
  };

  var components = [
    basePaths.src + 'modules/',
    basePaths.src + 'elements/'
  ];

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
    components:   components,
    gulpFiles:    gulpFiles,
    environments: environments
  };
};


