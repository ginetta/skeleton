module.exports = {
    compile: {
        options: {
            dir            : '<%= config.targetDir %>' + '/min/output',
            baseUrl        : '<%= config.targetDir %>' + '/js/',
            components     : [{ 'name': 'main' }],
            mainConfigFile : '<%= config.srcDir %>' + '/js/config-require.js'
        }
    }
};
