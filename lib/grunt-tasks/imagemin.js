module.exports = {
    static: {
        options: {
            optimizationLevel: 5
        },
        files: [{
            expand: true,
            cwd: '<%= config.targetDir %>' + '/img/',
            src: '{,*/}*.{gif,jpeg,jpg,png}',
            dest: '<%= config.targetDir %>' + '/img/'
        }]
    }
};