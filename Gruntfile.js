var config  = {
    srcDir: 'app',
    targetDir: 'dist',
    libDir: 'lib',
    componentListDir: 'styleguide',
    localesDir: 'data'
};

module.exports = function (grunt) {
    'use strict';
    var path = require('path');

    require('time-grunt')(grunt);

    // Loads grunt tasks found on package.json automatically
    require('load-grunt-tasks')(grunt, {pattern: 'grunt-*'});

    // Loads grunt tasks' configuration in lib/grunt-tasks/<task-name>.js
    require('load-grunt-config')(grunt, {
        data: { config: config },
        configPath: path.join(process.cwd(), 'lib/grunt-tasks')
    });
};
