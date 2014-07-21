module.exports = {
    optimize: {
        // options: { },
        files: [{
            expand: true,
            cwd: '<%= config.targetDir %>' + '/<%= config.assetsDir %>',
            src: ['**/*.svg'],
            dest: '<%= config.targetDir %>' + '/<%= config.assetsDir %>/'
        }]
    }
};