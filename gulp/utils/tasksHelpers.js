'use strict';

function TaskHelpers(gulp) {
  if (this instanceof TaskHelpers === false){
    return new TaskHelpers(gulp);
  }
  this.$ = require('gulp-load-plugins')();
  this.config = null;
  this.gulp = gulp;

  this.getTask = function getTask (task) {
    return require('../tasks/' + task)(this.gulp, this.$, this.config);
  };

  this.configure = function configure (config) {
    this.config = config;
  };
}

module.exports = TaskHelpers;
