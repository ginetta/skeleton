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
      _             = require('lodash'),
      componentListTemplate = grunt.file.glob.sync('lib/toolset/grunt-tasks/assembler/templates/component-list.jade')[0];
      componentTemplate = grunt.file.glob.sync('lib/toolset/grunt-tasks/assembler/templates/component.jade')[0];

  // Given an array of arrays, generates all possible combinations
  //  e.g.
  //  input:
  //  [[a, b], [c] ]
  //
  //  output:
  //  [[a, c], [b, c]]
  function allPossibleCases (arr) {
    if (!arr || arr.length === 0) {
      return [];
    } else if (arr.length ===1) {
      return arr[0];
    } else {
      var result = [];
      var allCasesOfRest = allPossibleCases(arr.slice(1));  // recur with the rest of array
      for (var c in allCasesOfRest) {
        for (var i = 0; i < arr[0].length; i++) {
          result.push([arr[0][i], allCasesOfRest[c]]);
        }
      }
      return result;
    }
  }

  function generateComponentOptionsCombinations(name, componentData) {
    grunt.log.writeln('generating component combinations for ' + name);
    var options, combinationValues, optionsKeys;


    // 1. get all possible values of all options and all the keys
    options     = _.toArray(_.pluck(componentData.options, 'values'));
    optionsKeys = Object.keys(componentData.options)

    // 2. generate all possible combinations of values of all options
    combinationValues = allPossibleCases(options);


    // 4. add option name as key to option values
    // for every combination
    var optionsCombinations = _.map(combinationValues, function(combination) {
      var optionCombination = {};
      // for every option in the combination, get the option name and add
      // it to the final object to return
      _.each(combination, function (optionValue, i) {
        var optionName = optionsKeys[i];
        optionCombination[optionName] = optionValue;
      });
      return optionCombination;
    });

    // 5. also add empty options for default values in the beginning
    optionsCombinations.unshift({});
    return optionsCombinations;
  }

  function addCombinationsToComponentsData (componentsData) {
    _.each(componentsData, function (component) {
      if (component.options) {
        var combinations = generateComponentOptionsCombinations(component.name, component);
        component.combinations = combinations;
      }
    });
    return componentsData;

  };

  grunt.registerTask('styleguideAssembler', function () {
    var componentsData = {};


    // 1. Read components data
    componentsData = Helper.getcomponentsData();

    componentsData.components = addCombinationsToComponentsData(componentsData.components);
    grunt.log.writeln('component with combinations ' + JSON.stringify(componentsData));
    var componentList = Helper.jadeRender(componentListTemplate, {'componentsData': componentsData });
    grunt.log.writeln('component list html ' + componentList);
    grunt.file.write('dist/styleguide/component-list.html', componentList);
    _.each(componentsData.components, function (component){
      if (!component.hideInStyleguide) {
        var componentHtml = Helper.jadeRender(componentTemplate, {'component': component, 'components': componentsData.allMetadata, 'relativePath': '../../' });
        grunt.file.write('dist/styleguide/components/' + component.name + ".html", componentHtml);
      }
    });

  });
};
