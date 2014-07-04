module.exports = {
    options: {
        data: {
            //debug: true,
            //styleguide: grunt.file.readJSON(config.configDir + "/config.json"),
            //pagedata: grunt.file.readJSON(config.dataDir + "/pagedata.json")
        },
        pretty: true,
        basedir: '<%= config.srcDir %>'
    },
    compile: {
        files: [{
            expand: true,
            cwd: '<%= config.srcDir %>',
            src: ["**/*.jade"],
            dest: '<%= config.targetDir %>',
            ext: ".html"
        }]
    }
};

