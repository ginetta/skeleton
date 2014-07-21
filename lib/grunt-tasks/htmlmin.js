module.exports = {
    minify: {
        // options copied from yeoman's webapp generator
        // https://github.com/yeoman/generator-webapp/blob/master/app/templates/Gruntfile.js#L309
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
            cwd: '<%= config.targetDir %>',
            src: '{,*/}*.html',
            dest: '<%= config.targetDir %>'
        }]
    }
};