const argv = require('yargs').argv;

module.exports = () => {
  const languages = ['en'];

  let skeletonConfig = {
    base: {
      entry: 'src/',
      dest: 'build/',
    },
  };

  skeletonConfig = Object.assign({}, skeletonConfig, {
    scripts: {
      entry: [`${skeletonConfig.base.entry}scripts/**/*.js`],
      all: [
        `${skeletonConfig.base.entry}**/*.js`,
      ],
      dest: `${skeletonConfig.base.dest}js/`,
    },
    styles: {
      entry: [
        `${skeletonConfig.base.entry}styles/**/*.scss`
      ],
      all: [
        `${skeletonConfig.base.entry}**/*.scss`
      ],
      dest: `${skeletonConfig.base.dest}css/`,
    },
    pages: {
      entryPath: `${skeletonConfig.base.entry}pages`,
      entry: [`${skeletonConfig.base.entry}pages/**/*.pug`],
      all: [
        `${skeletonConfig.base.entry}**/*.pug`,
        `${skeletonConfig.base.entry}**/*.yml`, // definition files
      ],
      dest: `${skeletonConfig.base.dest}`,
    },
    content: {
      entryPath: 'content/texts/',
      entry: ['content/texts/**/*.yml'],
      all: ['content/texts/**/*.yml'],
      dest: `${skeletonConfig.base.dest}content/texts/`,
    },
    assets: {
      entry: [
        `${skeletonConfig.base.entry}materials/**/*.+(bmp|eot|flv|gif|ico|jpg|jpeg|mp4|png|svg|swf|webp|woff|woff2|xloc|xml|xpi)`,
        'content/**/*',
        '!content/texts',
      ],
      all: [
        `${skeletonConfig.base.entry}materials/**/*.+(bmp|eot|flv|gif|ico|jpg|jpeg|mp4|png|svg|swf|webp|woff|woff2|xloc|xml|xpi)`,
        'content/**/*',
        '!content/texts',
      ],
      dest: `${skeletonConfig.base.dest}assets`,
    },
    meta: {
      entry: [
        'content/meta/**/*',
      ],
      all: [
        'content/meta/**/*',
      ],
      dest: skeletonConfig.base.dest,
    },
    definition: {
      entry: [
        `${skeletonConfig.base.entry}**/definition.yml`,
      ],
      all: [
        `${skeletonConfig.base.entry}**/definition.yml`,
      ],
    },
    revManifest: {
      dest: `${skeletonConfig.base.dest}rev-manifest.json`,
    },
    tooling: {
      all: [
        'gulp/**/*.js',
        'gulpfile.js',
        'webpack.config.js'
      ]
    }
  });

  return {
    languages,
    skeletonConfig,
    isProd: process.env.NODE_ENV === 'production',
  };
};
