const fs = require('fs');
const yamljs = require('yamljs');
const pugIncludeGlob = require('pug-include-glob');
const merge = require('merge-stream');
const path = require('path');
const glob = require('glob');
const _ = require('lodash');
const pageshelpers = require('../utils/pagesHelpers');
const handleError = require('../utils/handleError');

module.exports = (gulp, $, config) => {
  const srcFiles = config.appFiles.pages;
  const destFiles = config.paths.pages.dest;
  const languages = config.languages;
  const contentPath = config.paths.content.dest;
  const baseDir = config.basePaths.src;
  const manifestFile = config.paths.revManifest.dest;

  // Put the default language at the root
  const getLanguagePath = (language) => {
    if (language === config.languages[0]) {
      return '';
    }
    return `${language}/`;
  };

  // Returns the relative path between the page and the root of the web server
  const getRelativePath = (file, language) => {
    const destPath = config.paths.pages.src + getLanguagePath(language);
    const filePath = path.dirname(file.path);
    return `${path.relative(filePath, destPath) || '.'}/`;
  };

  const task = () => {
    // Load the content for the page
    function loadContent(language) {
      return yamljs.load(`${contentPath}${language}.yml`);
    }

    function getDestPath(language) {
      const destPath = destFiles + getLanguagePath(language);
      return destPath;
    }

    function loadMergedDefinitions() {
      return glob.sync(`${config.basePaths.src}**/definition.yml`)
        .reduce((acc, definitionPath) => {
          const normalizedPath = definitionPath
            .replace(config.basePaths.src, '')
            .replace('/definition.yml', '')
            ;
          return _.merge(acc, {
            [normalizedPath]: yamljs.load(definitionPath),
          });
        }, {})
        ;
    }

    function compilePages(language) {
      const destPath = getDestPath(language);

      return gulp.src(srcFiles)
        .pipe($.plumber(handleError))
        .pipe($.data((file) => {
          const mergedDefinitions = loadMergedDefinitions();
          return {
            data: loadContent(language),
            relativePath: getRelativePath(file, language),
            helpers: pageshelpers(config, mergedDefinitions),
            language,
          };
        }))
        .pipe($.pug({
          client: false,
          pretty: true,
          basedir: baseDir,
          plugins: [
            pugIncludeGlob(),
          ],
        }))
        .pipe($.if(config.isProd, $.revReplace({
          manifest: fs.existsSync(manifestFile) && gulp.src([manifestFile]),
        })))
        .pipe(gulp.dest(destPath));
    }

    // Generate the pages for each language
    const pagesStreams = languages.map(compilePages);

    return merge(pagesStreams);
  };

  task.description = 'Generate all pages from the pug files';
  return task;
};
