'use strict';
var del = require('del');

module.exports = function (gulp, $, config) {
  return function (cb) {
    var destFolder  = config.basePaths.dest + '*';

    del([destFolder], cb);
  };
};
