'use strict';
var del = require('del');

module.exports = function (gulp, $, config) {
  var destFolder  = config.basePaths.dest + '*';
  var srcGeneratedFolder  = config.basePaths.generatedsrc + '*';

  return function (cb) {
    del([destFolder, srcGeneratedFolder], cb);
  };
};
