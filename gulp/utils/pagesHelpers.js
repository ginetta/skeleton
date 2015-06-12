'use strict';
var yamljs      = require('yamljs');
var _           = require('lodash');
var markdown    = require('marked');

module.exports = function (config) {
  var srcDir = config.basePaths.src;

  // TODO: Rewrite and document this helper function

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
    var optionsSchema, schema, transformedOptions;
    options = options || {};
    transformedOptions = {};
    schema = yamljs.load(srcDir + path + '/definition.yml');
    optionsSchema = schema.options;
    _.forEach(optionsSchema, function(o, oKey) {
      transformedOptions[oKey] = {};
      if (Array.isArray(o)) {
        if (options[oKey] != null) {
          transformedOptions[oKey] = options[oKey];
        } else {
          transformedOptions[oKey] = o[0];
        }
        return transformedOptions[oKey];
      } else {
        _.forEach(o, function(subO, subOKey) {
          var ref;
          o = subO[0];
          if (((ref = options[oKey]) != null ? ref[subOKey] : void 0) != null) {
            o = options[oKey][subOKey];
          }
          if (subOKey === 'all') {
            subOKey = '';
          } else {
            subOKey = '-' + subOKey;
          }
          transformedOptions[oKey][subOKey] = o;
          return transformedOptions[oKey][subOKey];
        });
      }
    });
    return transformedOptions;
  };

  return {
    mergeDefaultOptions: mergeDefaultOptions,
    markdown: markdown
  };
};
