'use strict';
var del = require('del');

module.exports = function (gulp, $, config) {
  var destFolder  = config.basePaths.dest + '*';

  var task = function (cb) {
    return del([destFolder]);
  };

  task.description = 'Cleans the build folder';
  return task;
};

