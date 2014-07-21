/**
 * The way this plugins works as follows:
 *
 *    - It first looks for components in the project (a component being a sub-folder
 *      of /frontend/components containing a package.json file describing the component)
 *      and generates an object with the components information. In this object is also
 *      included a namespaced object with all the components metadata ( see getcomponentsData()
 *      for more details)
 *
 *    - It then generates two .html files (for the components itself and for the styleguide)
 *
 */


module.exports = function (grunt, options) {
  var chalk         = require('chalk'),
      srcDir        = options.config.srcDir,
      targetDir     = options.config.targetDir,
      libDir        = options.config.libDir,
      styleguideDir = options.config.componentListDir,
      Helper        = new (require('./helpers'))(grunt, options),
      _             = require('lodash');

  grunt.registerTask('styleguideAssembler', function () {
    var componentsData = {};


    // 1. Read components data
    componentsData = Helper.getcomponentsData();

    // 2. Build components pages (both components and styleguide)
    buildcomponentsPage(componentsData);
  });

  /**
   * Builds components' html pages based on their templates and the generated namespaced metadata
   * @param  {Object} componentsData generated namespaced metadata (see getcomponentsData for more information)
   *
   */
  function buildcomponentsPage(componentsData) {
    grunt.log.writeln(chalk.green('\tBuilding components page:'));

    var compilationData = _.merge(
      {"data": _.sample(Helper.getLocales()) },
      componentsData.allMetadata
    );

    componentsData.components.forEach(function (component) {
      var html = Helper.jadeRender(
        component.tplFilePath,
        compilationData,
        "\n+" + component.name
      );

      grunt.log.writeln(chalk.cyan('\t\t— Building ') + chalk.yellow(component.identifier + ".html"));

      //  Creates styleguide page
      grunt.file.write(
        targetDir + '/' + styleguideDir + '/components/' + component.identifier + '.html',
        html
      );
    });
  }
};