module.exports = {
    options: {
        jshintrc : true,
        reporter : require('jshint-stylish')
    },
    js: {
        src    : ['Gruntfile.js', 'js/**', 'grunt/*.js'],
        dest   : '<%= config.targetDir %>',
        cwd    : '<%= config.srcDir %>' + '/',
        expand : true
    },
    modulesjs: {
        src    : ['modules/**/*.js'],
        dest   : '<%= config.targetDir %>',
        cwd    : '<%= config.srcDir %>',
        expand : true
    }
};