module.exports = {
    dist: {
        options: {
            sassDir        : '<%= config.srcDir %>' + '/css',
            cssDir         : '<%= config.targetDir %>' + '/css',
            fontsDir       : '<%= config.targetDir %>' + '/fonts',
            imagesDir      : '<%= config.srcDir %>' + '/' + '<%= config.assetsDir %>',
            javascriptsDir : '<%= config.srcDir %>' + '/js',
            importPath     : ['<%= config.srcDir %>',
                              '<%= config.libDir %>/bower_components',
                              '<%= config.targetDir %>/css/icons'],
            relativeAssets : true,
            noLineComments : true
        }
    }
};
