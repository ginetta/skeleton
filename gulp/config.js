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
      dest: `${basePaths.dest}content/`,
    },
    pages: {
      src: `${basePaths.src}pages/`,
      dest: basePaths.dest,
    },
    layouts: {
      src: `${basePaths.src}layouts/`,
    },
    assets: {
      src: [`${basePaths.src}materials/`, `${basePaths.content}`],
      dest: `${basePaths.dest}assets`,
    },
    meta: {
      src: `${basePaths.src}meta/`,
      dest: `${basePaths.dest}`,
    },
    revManifest: {
      dest: `${basePaths.dest}rev-manifest.json`,
    },
  };

  const assetsFileTypes = '+(appcache|atom|bbaw|bmp|crx|css|cur|eot|f4[abpv]|flv|geojson|gif|htc|ico|jpe?g|js|json(ld)?|m4[av]|manifest|map|mp4|oex|og[agv]|opus|otf|pdf|png|rdf|rss|safariextz|svg|svgz?|swf|topojson|tt[cf]|txt|vcard|vcf|vtt|webapp|web[mp]|webmanifest|woff2?|xloc|xml|xpi)';

  const appFiles = {
    scripts: `${paths.scripts.src}**/*.js`,
    styles: `${paths.styles.src}**/*.scss`,
    content: `${paths.content.src}**/*.yml`,
    pages: `${paths.pages.src}**/*.pug`,
    layouts: `${paths.layouts.src}**/*.pug`,
    assets: paths.assets.src.map(folder => `${folder}**/*.${assetsFileTypes}`),
    meta: `${paths.meta.src}**/*`,
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
