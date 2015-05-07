module.exports = {
    compile: {
        options: {
            baseUrl        : '<%= config.targetDir %>/',
            components     : [{ 'name': 'main' }],
            mainConfigFile : '<%= config.srcDir %>' + '/js/config-require.js',
            name: 'main',
            out: '<%= config.targetDir %>/js-bundle/main.js'
        }
    }
};
