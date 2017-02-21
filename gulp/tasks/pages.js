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
  const entryGlob = config.entryGlobs.pages;
  const destPath = config.destPaths.pages;
  const contentPath = config.destPaths.content;
  const definitionGlob = config.entryGlobs.definitions;
  const manifestDestPath = config.destPaths.revManifest;

  // Load the content for the page
  function loadContentForLanguage(language) {
    return yamljs.load(`${contentPath}${language}.yml`);
  }

  const task = () => {
    const languages = configHelpers.getAvailableLanguages(config);

    function getDestPath(language) {
      return destPath + configHelpers.getLanguagePath(language, languages);
    }

    // Returns the relative path between the page and the root of the web server
    const getRelativePath = (file, language) => {
      const languageDestPath = config.entryPaths.pages +
        configHelpers.getLanguagePath(language, languages);
      const filePath = path.dirname(file.path);
      return `${path.relative(filePath, languageDestPath) || '.'}/`;
    };

    function loadMergedDefinitions() {
      return definitionGlob.map(d => glob.sync(d))
        .reduce((a, b) => a.concat(b), [])
        .reduce((acc, definitionPath) => {
          const normalizedPath = definitionPath
            .replace(config.entryPaths.src, '')
            .replace('/definition.yml', '')
            ;
          return _.merge(acc, {
            [normalizedPath]: yamljs.load(definitionPath),
          });
        }, {})
        ;
    }

    function compilePages(language) {
      const languageDestPath = getDestPath(language);

      return gulp.src(entryGlob)
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
          manifest: fs.existsSync(manifestDestPath) && gulp.src(manifestDestPath),
        })))
        .pipe(gulp.dest(languageDestPath));
    }

    // Generate the pages for each language
    const pagesStreams = languages.map(compilePages);

    return merge(pagesStreams);
  };

  task.description = 'Generate all pages from the pug files';
  return task;
};
