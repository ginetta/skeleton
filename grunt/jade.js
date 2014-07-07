module.exports = function (grunt, options) {
    return {
        options: {
            data: {
                //debug: true,
                //styleguide: grunt.file.readJSON(config.configDir + "/config.json"),
                //pagedata: grunt.file.readJSON(config.dataDir + "/pagedata.json")
                // t: {
                //     en: grunt.file.readJSON('locales/en_US.json')
                // }
            },
            pretty: true,
            basedir: '<%= config.srcDir %>'
        },
        compile: {
            files: [{
                expand: true,
                cwd: '<%= config.srcDir %>/pages',
                src: ["**/*.jade"],
                dest: '<%= config.targetDir %>/pages',
                ext: ".html"
            }]
        }
    };
};

