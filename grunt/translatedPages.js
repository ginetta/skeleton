module.exports = function (grunt, options) {
  var _           = require('lodash'),
      chalk       = require('chalk'),
      path        = require('path'),
      srcDir      = options.config.srcDir,
      targetDir   = options.config.targetDir,
      changeCase  = require('change-case'),
      Helper      = new (require('./helpers'))(grunt, options);

  grunt.registerTask('translatedPages', function () {

    var modulesData = {},
        locales     = {},
        pages       = {};

    // 1. Read modules data and render their html
    modulesData = Helper.getModulesData();

    // 2. Get locales object
    locales = Helper.getLocales();
    pages   = Helper.getPageFiles();

    function compute (from, to) {
      return (path.relative(path.dirname(from), to) || '.') + '/';
    }

    _.each(locales, function (translations, localeName) {
      var translationOptions = _.merge({ "translation": translations }, modulesData.allMetadata);

      grunt.log.writeln(chalk.red('\tTranslating pages to ') + chalk.yellow(localeName));

      _.each(pages, function (page) {
        var translatedPageHtml,
            pageName = _.last(page.split('/')).replace('.jade', ''),
            fileDest = targetDir + '/pages-html/' + localeName + '/' + pageName + '.html',
            relativePath = compute(fileDest, targetDir + '/');

        translationOptions = _.merge(translationOptions, { "relativePath": relativePath });
        translatedPageHtml = Helper.jadeRender(page, translationOptions);


        grunt.log.writeln(chalk.cyan('\t\t— Translating ') + chalk.yellow(pageName));

        // Creates component page (for developement);
        grunt.file.write(
            targetDir + '/pages-html/' + localeName + '/' + pageName + '.html',
            translatedPageHtml
        );
      });
    });
  });

  function getLocales () {
    var locales = {};
    grunt.log.writeln(chalk.red('\tLooking for translation files:'));
    Helper.getLocaleFiles().forEach(function (localePath) {
      var localeName = localePath.split('/')[1].replace('.json', '');
      locales[localeName] = grunt.file.readJSON(localePath);
      grunt.log.writeln(chalk.cyan('\t\t— Found ') + chalk.yellow(localeName) + chalk.cyan(' translation'));
    });
    return locales;
  }

};
