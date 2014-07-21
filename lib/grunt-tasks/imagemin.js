module.exports = {
    static: {
        options: {
            optimizationLevel: 5
        },
        files: [{
            expand: true,
            cwd: '<%= config.targetDir %>' + '/<%= config.assetsDir %>/',
            src: '{,*/}*.{gif,jpeg,jpg,png}',
            dest: '<%= config.targetDir %>' + '/<%= config.assetsDir %>/'
        }]
    }
};