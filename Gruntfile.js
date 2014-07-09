var config  = {
    srcDir: 'frontend',
    targetDir: 'dist',
    componentListDir: 'styleguide',
    localesDir: 'locales'
};

module.exports = function (grunt) {
    'use strict';
    require('time-grunt')(grunt);

    // Loads grunt tasks found on package.json automatically
    require('load-grunt-tasks')(grunt, {pattern: 'grunt-*'});

    // Loads grunt tasks' configuration in grunt/<task-name>.js
    require('load-grunt-config')(grunt, {
        data: { config: config }
    });
};
