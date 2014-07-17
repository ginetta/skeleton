module.exports = {
    options: {
        report: 'gzip'
    },
    minify: {
        expand: true,
        cwd: '<%= config.targetDir %>' + '/css/',
        src:  ['*.css'],
        dest: '<%= config.targetDir %>' + '/css/'
    }
};