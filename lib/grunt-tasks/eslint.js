module.exports = {
    options: {
        config: ".eslint"
    },
    js: {
        expand: true,
        src: ['Gruntfile.js', 'js/**', 'grunt/*.js'],
        dest: '<%= config.targetDir %>',
        cwd: '<%= config.srcDir %>' + '/'
    },
    modulesjs: {
        expand: true,
        src: ['modules/**/*.js'],
        dest: '<%= config.targetDir %>',
        cwd: '<%= config.srcDir %>'
    }
};