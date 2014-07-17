module.exports = {
    minify: {
        options: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeCommentsFromCDATA: true,
            removeEmptyAttributes: true,
            removeOptionalTags: true,
            removeRedundantAttributes: true,
            useShortDoctype: true
        },
        files: [{
            expand: true,
            cwd:  '<%= config.targetDir %>/pages',
            src:  '{,*/}*.html',
            dest: '<%= config.targetDir %>/pages'
        }]
    }
};