var config = {
    srcDir: 'app',
    targetDir: 'dist',
    libDir: 'lib',
    componentListDir: 'styleguide',
    localesDir: 'data',
    assetsDir: 'assets'
};

module.exports = function(grunt) {
    'use strict';
    var path = require('path');

    require('time-grunt')(grunt);

    // Loads grunt tasks found on package.json automatically
    require('load-grunt-tasks')(grunt, {
        pattern: 'grunt-*'
    });

    // Requiring our custom grunt tasks from the toolset
    // TODO: move to npm
    require('./lib/toolset/grunt-tasks/assembler/pagesAssembler.js')(grunt, {
        config: config
    });
    require('./lib/toolset/grunt-tasks/assembler/styleguideAssembler.js')(grunt, {
        config: config
    });
    require('./lib/toolset/grunt-tasks/assembler/addComponent.js')(grunt, {
        config: config
    });

    // Loads grunt tasks' configuration in lib/grunt-tasks/<task-name>.js
    require('load-grunt-config')(grunt, {
        data: {
            config: config
        },
        configPath: path.join(process.cwd(), 'lib/grunt-tasks')
    });
};