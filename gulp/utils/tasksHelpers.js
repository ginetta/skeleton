'use strict';

function TaskHelpers(gulp, config) {
  if (this instanceof TaskHelpers === false){
    return new TaskHelpers(gulp, config);
  }

  this.getTask = function getTask (task) {
    return require('../tasks/' + task)(this.gulp, this.$, this.config);
  };

  this.configure = function configure (config) {
    this.config = config;
  };

  this.$ = require('gulp-load-plugins')();
  this.config = null;
  this.gulp = gulp;
  this.configure(config);
}

module.exports = TaskHelpers;
