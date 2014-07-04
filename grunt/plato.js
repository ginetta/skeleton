module.exports = {
    allFiles: {
        files: {
            'reports': [
                'Gruntfile.js',
                'grunt/*.js',
                '<%= config.srcDir %>' + '/modules/**/*.js',
                '<%= config.srcDir %>' + '/js/**'
            ]
        }
    }
};