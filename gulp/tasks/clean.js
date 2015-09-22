'use strict';
var del = require('del');

module.exports = function (gulp, $, config) {
  var destFolder  = config.basePaths.dest + '*';

  return function (cb) {
    del([destFolder], cb);
  };
};
