const fs = require('fs');
const yamljs = require('yamljs');
const pugIncludeGlob = require('pug-include-glob');
const merge = require('merge-stream');
const path = require('path');
const glob = require('glob');
const _ = require('lodash');
const pageshelpers = require('../utils/pagesHelpers');
const handleError = require('../utils/handleError');
const configHelpers = require('../utils/configHelpers');

module.exports = (gulp, $, config) => {
  const entry = config.paths.pages.entry;
  const dest = config.paths.pages.dest;
  const contentPath = config.paths.content.dest;
  const definition = config.paths.definition.entry;
  const manifestFile = config.paths.revManifest.dest;

  // Load the content for the page
  function loadContentForLanguage(language) {
    return yamljs.load(`${contentPath}${language}.yml`);
  }

  const task = () => {
    const languages = configHelpers.getAvailableLanguages(config);

    function getDestPath(language) {
      const destPath = dest + configHelpers.getLanguagePath(language, languages);
      return destPath;
    }

    // Returns the relative path between the page and the root of the web server
    const getRelativePath = (file, language) => {
      const destPath = config.paths.pages.entryPath +
        configHelpers.getLanguagePath(language, languages);
      const filePath = path.dirname(file.path);
      return `${path.relative(filePath, destPath) || '.'}/`;
    };

    function loadMergedDefinitions() {
      return definition.map(d => glob.sync(d))
        .reduce((a, b) => a.concat(b), [])
        .reduce((acc, definitionPath) => {
          const normalizedPath = definitionPath
            .replace(config.paths.base.entry, '')
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

      return gulp.src(entry)
        .pipe($.plumber(handleError))
        .pipe($.data((file) => {
          const mergedDefinitions = loadMergedDefinitions();
          return {
            data: loadContentForLanguage(language),
            relativePath: getRelativePath(file, language),
            helpers: pageshelpers(config, mergedDefinitions),
            language,
          };
        }))
        .pipe($.pug({
          client: false,
          pretty: true,
          plugins: [
            pugIncludeGlob(),
          ],
        }))
        .pipe($.if(config.isProd, $.revReplace({
          manifest: fs.existsSync(manifestFile) && gulp.src(manifestFile),
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
