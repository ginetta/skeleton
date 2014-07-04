module.exports = {
    compile: {
        options: {
            dir            : '<%= config.targetDir %>' + '/min/output',
            baseUrl        : '<%= config.targetDir %>' + '/js/',
            modules        : [{ "name": "main" }],
            mainConfigFile : '<%= config.targetDir %>' + "/js/config-require.js"
        }
    }
};