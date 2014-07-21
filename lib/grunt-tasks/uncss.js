module.exports = {
    optimize: {
        files: {
            '<%= config.targetDir %>/css/main.css': [
                '<%= config.targetDir %>/**/*.html',
                '!<%= config.targetDir %>/css/icons/preview.html'
            ]
        }
    }
};