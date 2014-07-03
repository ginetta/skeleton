/* jslint node: true, stupid: true, es5: true */
/* globals GLOBAL: true */

//https://github.com/helsana/microsite-permission

'use strict';

var config;

config = {
    srcDir: 'frontend',
    targetDir: 'dist',
    tepDir: 'tmp'
};

module.exports = function (grunt) {
    require('time-grunt')(grunt);

    grunt.initConfig({
        clean: {
            icons: [config.targetDir + '/img/'],
            js:  [config.targetDir + '/js/'],
            css:  [config.targetDir + '/css/'],
            html:  [config.targetDir + '/**/*.html']
        },
        copy: {
            images: {
                expand: true,
                src: ['img/**'],
                dest: config.targetDir,
                cwd: config.srcDir + '/'
            },
            meta: {
                expand: true,
                src: ['**'],
                dest: config.targetDir,
                cwd: config.srcDir + '/meta/'
            },
            fonts: {
                expand: true,
                src: ['fonts/**'],
                dest: config.targetDir,
                cwd: config.srcDir + '/'
            },
            js: {
                files: [{
                    expand: true,
                    src: ['js/**'],
                    dest: config.targetDir,
                    cwd: config.srcDir + '/'
                }]
            },
            modulesjs: {
                files: [{
                    expand: true,
                    src: ['modules/**/*.js'],
                    dest: config.targetDir,
                    cwd: config.srcDir
                }]
            },
            vendorjs: {
                files: [{
                    expand: true,
                    src: ['bower_components/**/*.js'],
                    dest: config.targetDir,
                    cwd: config.srcDir
                }]    
            }
        },
        watch: {
            options: {
                livereload: true
            },
            css: {
                files: [
                    config.srcDir + '/css/**',
                    config.srcDir + '/**/*.scss'
                ],
                tasks: ['compass']
            },
            jade: {
                files: [config.srcDir + '/**/*.jade'],
                tasks: ['jade']
            },
            js: {
                files: [config.srcDir + '/**/*.js'],
                tasks: ['copy:js','copy:modulesjs']
            }
        },
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: "localhost",
            },
            server: {
                options: {
                    open: "http://localhost:9000/",
                    base: [config.targetDir]
                }
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: config.srcDir + "/css",
                    cssDir: config.targetDir + "/css",
                    imagesDir: config.srcDir + "/img",
                    javascriptsDir: config.srcDir + "/js",
                    fontsDir: config.targetDir + "/fonts",
                    importPath: [config.srcDir],
                    relativeAssets: true,
                    noLineComments: true
                }
            }
        },
        jade: {
            options: {
                data: {
                    //debug: true,
                    //styleguide: grunt.file.readJSON(config.configDir + "/config.json"),
                    //pagedata: grunt.file.readJSON(config.dataDir + "/pagedata.json")
                },
                pretty: true,
                basedir: config.srcDir
            },
            compile: {
                files: [{
                    expand: true,
                    cwd: config.srcDir,
                    src: ["**/*.jade"],
                    dest: config.targetDir,
                    ext: ".html"
                }]
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: config.targetDir + '/js/',
                    mainConfigFile: config.targetDir + "/js/config-require.js",
                    dir: config.targetDir + '/min/output',
                    modules: [
                        {
                            "name": "main"
                        }
                    ]
                }
            }
        },
        grunticon: {
            icons: {
                files: [{
                    expand: true,
                    cwd: config.srcDir + '/img/icons',
                    src: ['*.svg', '*.png'],
                    dest: config.srcDir + '/img/icons-rendered'
                }],
                options: {
                    datasvgcss: 'icons.data.svg.scss',
                    cssprefix: '.icon-'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-grunticon');

    grunt.loadNpmTasks('grunt-autoprefixer');


    //grunt.task.loadTasks('./build/grunt-tasks/');
    /*grunt.registerTask('buildComponentList', function () {
        require('./build/grunt-tasks/buildComponentList.js')(grunt,config);
    });*/

    grunt.registerTask('default', [
        'work'
    ]);

    grunt.registerTask('work', [
        'build-dev',
        'connect',
        'watch'
    ]);

    grunt.registerTask('build-dev', [
        'clean',
        'grunticon',
        'copy',
        'compass',
        'jade',
        'requirejs'
    ]);

};
