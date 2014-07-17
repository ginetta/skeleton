module.exports = {
    minify: {
        expand: true,
        cwd: '<%= config.targetDir %>' + '/css/',
        src:  ['*.css'],
        dest: '<%= config.targetDir %>' + '/css/'
    }
};