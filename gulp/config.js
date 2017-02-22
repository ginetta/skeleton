module.exports = () => {
  let paths = {
    base: {
      entry: 'src/',
      dest: 'build/',
    },
  };

  paths = Object.assign({}, paths, {
    scripts: {
      entry: [
        `${paths.base.entry}layouts/**/*.js`,
        `${paths.base.entry}pages/**/*.js`,
        `${paths.base.entry}vendor.js`,
      ],
      all: [
        `${paths.base.entry}**/*.js`,
      ],
      dest: `${paths.base.dest}js/`,
    },
    styles: {
      entry: [
        `${paths.base.entry}layouts/**/*.scss`,
        `${paths.base.entry}pages/**/*.scss`,
      ],
      all: [
        `${paths.base.entry}**/*.scss`
      ],
      dest: `${paths.base.dest}css/`,
    },
    pages: {
      entryPath: `${paths.base.entry}pages`,
      entry: [`${paths.base.entry}pages/**/*.pug`],
      all: [
        `${paths.base.entry}**/*.pug`,
        `${paths.base.entry}**/*.yml`, // definition files
      ],
      dest: `${paths.base.dest}`,
    },
    content: {
      entryPath: 'content/texts/',
      entry: ['content/texts/**/*.yml'],
      all: ['content/texts/**/*.yml'],
      dest: `${paths.base.dest}content/texts/`,
    },
    assets: {
      entry: [
        `${paths.base.entry}materials/**/*.+(bmp|eot|flv|gif|ico|jpg|jpeg|mp4|png|svg|swf|webp|woff|woff2|xloc|xml|xpi)`,
        'content/**/*',
        '!content/texts',
      ],
      all: [
        `${paths.base.entry}materials/**/*.+(bmp|eot|flv|gif|ico|jpg|jpeg|mp4|png|svg|swf|webp|woff|woff2|xloc|xml|xpi)`,
        'content/**/*',
        '!content/texts',
      ],
      dest: `${paths.base.dest}assets`,
    },
    meta: {
      entry: [
        'content/meta/**/*',
      ],
      all: [
        'content/meta/**/*',
      ],
      dest: paths.base.dest,
    },
    definition: {
      entry: [
        `${paths.base.entry}**/definition.yml`,
      ],
      all: [
        `${paths.base.entry}**/definition.yml`,
      ],
    },
    revManifest: {
      dest: `${paths.base.dest}rev-manifest.json`,
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
    paths,
    isProd: process.env.NODE_ENV === 'production',
  };
};
