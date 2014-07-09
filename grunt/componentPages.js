/**
 * The way this plugins works as follows:
 *
 *    - It first looks for components in the project (a component being a sub-folder
 *      of /frontend/modules containing a package.json file describing the component)
 *      and generates an object with the components information. In this object is also
 *      included a namespaced object with all the components metadata ( see getModulesData()
 *      for more details)
 *
 *    - It then generates two .html files (for the components itself and for the styleguide)
 *
 */


module.exports = function (grunt, options) {
  var chalk         = require('chalk'),
      srcDir        = options.config.srcDir,
      targetDir     = options.config.targetDir,
      styleguideDir = options.config.componentListDir,
      Helper        = new (require('./helpers'))(grunt, options),
      _             = require('lodash');

  grunt.registerTask('componentPages', function () {
    var modulesData = {};


    // 1. Read modules data
    modulesData = Helper.getModulesData();

    // 2. Build modules pages (both components and styleguide)
    buildModulesPage(modulesData);
  });

  /**
   * Builds modules' html pages based on their templates and the generated namespaced metadata
   * @param  {Object} modulesData generated namespaced metadata (see getModulesData for more information)
   *
   */
  function buildModulesPage(modulesData) {
    grunt.log.writeln(chalk.red('\tBuilding modules page:'));

    var compilationData = _.merge(
      {"translation": _.sample(Helper.getLocales()) },
      modulesData.allMetadata
    );

    modulesData.modules.forEach(function (module) {
      var html = Helper.jadeRender(
        module.tplFilePath,
        compilationData,
        "\n+" + module.name
      );

      grunt.log.writeln(chalk.cyan('\t\t— Building ') + chalk.yellow(module.identifier + ".html"));

      //  Creates styleguide page
      grunt.file.write(
        styleguideDir + '/components/' + module.identifier + '.html',
        html
      );

      // Creates component page (for developement);
      grunt.file.write(
        targetDir + '/components-html/' + module.identifier + '.html',
        html
      );
    });
  }
};