module.exports = {
    optimize: {
        files: {
            '<%= config.targetDir %>/css/main.css': ['<%= config.targetDir %>/pages/**/*.html']
        }
    }
};