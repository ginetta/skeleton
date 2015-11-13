'use strict';
var yamljs      = require('yamljs');
var _           = require('lodash');
var markdown    = require('marked');
var jadeInline  = require('jade-inline-file');

module.exports = function (config) {
  var srcDir = config.basePaths.src;

  // TODO: Rewrite and document this helper function

  /**
   * Helper doesn't validates if a user specifies a value
   */
  function hasValue (value) {
    return value !== null && value !== undefined;
  }

  /**
   * Merges a simple component option with its default
   *
   * *optionValue* the value of the option, as called by the user.
   *
   * *optionSchema* the schema of the option, as defined in definition.yml
   * (e.g. ['foo', 'bar'])
   *
   * If the user doesn't pass any value, take the default from the schema
   */
  function mergeSimpleOptionDefault (optionValue, optionSchema) {
    // if the passed options has any value for this option
    // just take that value
    if (hasValue(optionValue)) {
      return optionValue;
    }
    // otherwise take the default value (first value)
    return optionSchema[0];
  }

  /**
   * Merges a complex component option with its default
   *
   * *optionValue* the value of the complex option, has called by the user
   * (e.g. { all: 'foo', mobile: 'bar' })
   *
   * *optionSchema* the schema of the complex option, has defined in definition.yml
   * (e.g. { all: ['bar', 'foo'], mobile: ['foo', 'bar'] } )
   *
   * This function, for all suboptions, takes the default value if the user
   * doesn't specify any value
   */
  function mergeComplexOptionDefault(optionValue, optionSchema) {
    var transformedOption = {};

    // For each sub-option of the schema
    _.forEach(optionSchema, function(subO, subOKey) {
      var subOptionValue = mergeSimpleOptionDefault(optionValue[subOKey], subO);

      // process the suboption transformed key
      if (subOKey === 'all') {
        subOKey = '';
      } else {
        subOKey = '-' + subOKey;
      }

      transformedOption[subOKey] = subOptionValue;
    });
    return transformedOption;
  }

  // In short, it transforms this object:
  // options:
  //   size:
  //     all: 'value1'
  //     mobile: 'value2'
  //   ratio:
  //     all: value3
  //   border: true

  // Into this one:

  // options:
  //   size:
  //     '': 'value1'
  //     '-mobile': 'value2'
  //   ratio:
  //     '': value3
  //   border: true
  var mergeDefaultOptions = function(options, path) {
    var optionsSchema, schema;
    options = options || {};
    schema = yamljs.load(srcDir + path + '/definition.yml');
    optionsSchema = schema.options;
    return _.mapValues(optionsSchema, function(o, oKey) {
      // Handle simple option (options that are just an array)
      if (Array.isArray(o)) {
        return mergeSimpleOptionDefault(options[oKey], o);
      }

      return mergeComplexOptionDefault(options[oKey] || {}, o);
    });
  };

  return {
    mergeDefaultOptions: mergeDefaultOptions,
    markdown: markdown,
    inline: jadeInline
  };
};
