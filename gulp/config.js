const argv = require('yargs').argv;
const path = require('path');

module.exports = () => {
  const basePaths = {
    root: path.join(__dirname, '..'),
    src: 'src/',
    content: 'content/',
    assets: 'assets/',
    dest: 'build/',
    tmp: '.tmp/',
  };

  const languages = ['en'];

  const paths = {
    scripts: {
      src: `${basePaths.src}scripts/`,
      dest: `${basePaths.dest}js/`,
    },
    styles: {
      src: `${basePaths.src}styles/`,
      dest: `${basePaths.dest}css/`,
    },
    content: {
      src: `${basePaths.content}texts/`,
      dest: `${basePaths.dest}content/texts/`,
    },
    pages: {
      src: `${basePaths.src}pages/`,
      dest: basePaths.dest,
    },
    layouts: {
      src: `${basePaths.src}layouts/`,
    },
    images: {
      src: `${basePaths.content}images/`,
      dest: `${basePaths.dest}content/images/`,
    },
    logos: {
      src: `${basePaths.assets}logos/`,
      dest: `${basePaths.dest}assets/logos/`,
    },
    favicons: {
      src: `${basePaths.assets}favicons/`,
      dest: basePaths.dest,
    },
    fonts: {
      src: `${basePaths.assets}fonts/`,
      dest: `${basePaths.dest}assets/fonts/`,
    },
    revManifest: {
      dest: `${basePaths.dest}rev-manifest.json`,
    },
  };

  const appFiles = {
    scripts: `${paths.scripts.src}**/*.js`,
    styles: `${paths.styles.src}**/*.scss`,
    content: `${paths.content.src}**/*.yml`,
    pages: `${paths.pages.src}**/*.pug`,
    layouts: `${paths.layouts.src}**/*.pug`,
    images: `${paths.images.src}**/*`,
    logos: `${paths.logos.src}**/*`,
    favicons: `${paths.favicons.src}**/*`,
    fonts: `${paths.fonts.src}**/*`,
  };

  const components = [
    `${basePaths.src}modules/`,
    `${basePaths.src}elements/`,
  ];

  const gulpFiles = [
    'gulp/**/*.js',
    'gulpfile.js',
  ];

  return {
    basePaths,
    languages,
    paths,
    appFiles,
    components,
    gulpFiles,
    isProd: process.env.NODE_ENV === 'production',
  };
};
