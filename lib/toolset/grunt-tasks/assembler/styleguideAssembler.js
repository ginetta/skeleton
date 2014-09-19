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

var HelperCons    = require("./helpers");
var _             = require("lodash");

module.exports = function (grunt, options) {
  var Helper        = new HelperCons(grunt, options),
      componentListTemplate = grunt.file.glob.sync("lib/toolset/grunt-tasks/assembler/templates/component-list.jade")[0],
      componentTemplate = grunt.file.glob.sync("lib/toolset/grunt-tasks/assembler/templates/component.jade")[0],
      componentCombinationTemplate = grunt.file.glob.sync("lib/toolset/grunt-tasks/assembler/templates/component-combination.jade")[0];

  /**
   * Given an array of arrays, generates all possible combinations
   * (Taken from http://codereview.stackexchange.com/a/52126)
   * e.g.:
   *   intput: [[a, b], [c]]
   *   output: [[a, c], [b, c]]
   *
   * @param  {Array[Array]} array array of arrays to generate combinatins
   * @return {Array[Array]}       array containing all possible combinatiosn
   */
  function combinations(array) {
    if(!array.length) {
      return [];
    }

    // wrap non-array values
    // e.g. ['x',['y','z']] becomes [['x'],['y','z']]
    array = array.map(function (item) {
      return item instanceof Array ? item : [item];
    });

    // internal recursive function
    function combine(list) {
      var prefixes, combinations;

      if(list.length === 1) {
        return list[0];
      }

      prefixes = list[0];
      combinations = combine(list.slice(1)); // recurse

      // produce a flat list of each of the current
      // set of values prepended to each combination
      // of the remaining sets.
      return prefixes.reduce(function (memo, prefix) {
        return memo.concat(combinations.map(function (combination) {
          return [prefix].concat(combination);
        }));
      }, []);
    }

    return combine(array);
  }

  /**
   * [generateComponentOptionsCombinations description]
   * @param  {[type]} name          [description]
   * @param  {[type]} componentData [description]
   * @return {[type]}               [description]
   */
  function generateComponentOptionsCombinations(componentData) {
    var name = componentData.name;
    var componentOptions, combinationValues, optionsKeys;


    // 1. get all possible values of all options and all the keys
    componentOptions = _.toArray(_.pluck(componentData.options, "values"));
    optionsKeys      = Object.keys(componentData.options);


    // 2. generate all possible combinations of values of all options
    combinationValues = combinations(componentOptions);
    grunt.log.writeln("option combinations", JSON.stringify(combinationValues));

    // // 4. add option name as key to option values
    // // for every combination
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

    // // 5. also add empty options for default values in the beginning
    optionsCombinations.unshift({});
    return optionsCombinations;
  }


  /**
   * Creates styleguide index page which contains a list
   * of components and a link to their specific styleguide page.
   *
   * @param  {Object} componentsData data of all components
   */
  function generateComponentListPage(componentsData) {
    var componentList = Helper.jadeRender(
      componentListTemplate,
      {
        "componentsData": componentsData,
        "relativePath": "../"
      }
      );
    grunt.file.write("dist/styleguide/index.html", componentList);
  }

  function generateComponentPage(component, componentsData) {
    if (!component.hideInStyleguide) {
      component.combinations = generateComponentOptionsCombinations(component);
      // grunt.log.writeln("componend combinations", JSON.stringify(component.combinations));

      _.each(component.combinations, function (combination, index) {
        grunt.log.writeln("component", JSON.stringify(component));
        var combinationHtml = Helper.jadeRender(
          componentCombinationTemplate,
          {
            "component": component,
            "components": componentsData.allMetadata,
            "combination": combination,
            "relativePath": "../../../"
          }
        );

        grunt.file.write("dist/styleguide/components/" + component.name + "/c" + index + ".html", combinationHtml);
        // grunt.log.writeln("combination html"+ combinationHtml);
      });

      var componentHtml = Helper.jadeRender(
        componentTemplate,
        {
          "component": component,
          "components": componentsData.allMetadata,
          "relativePath": "../../"
        }
      );
      grunt.file.write("dist/styleguide/components/" + component.name + ".html", componentHtml);
    }
  }

  grunt.registerTask("styleguideAssembler", function () {
    var componentsData = {};

    // 1. Read components data
    componentsData = Helper.getcomponentsData();

    // 2. Generate components list page
    generateComponentListPage(componentsData);

    // 3. Generate component page
    // componentsData.components = addCombinationsToComponentsData(componentsData.components);
    // // grunt.log.writeln("component with combinations " + JSON.stringify(componentsData));
    _.each(componentsData.components, function (component){
      generateComponentPage(component, componentsData);
    });

  });
};
