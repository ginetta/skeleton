module.exports = {
    optimize: {
        // options: { },
        files: [{
            expand: true,
            cwd: '<%= config.targetDir %>' + '/img',
            src: ['**/*.svg'],
            dest: '<%= config.targetDir %>' + '/img/'
        }]
    }
};