module.exports = {
    options: {
        livereload: true
    },
    css: {
        files: [
            '<%= config.srcDir %>' + '/css/**',
            '<%= config.srcDir %>' + '/**/*.scss'
        ],
        tasks: ['compass']
    },
    jadePages: {
        files: ['<%= config.srcDir %>' + '/pages/**/*.jade'],
        tasks: ['jade']
    },
    jadeComponents: {
        files: ['<%= config.srcDir %>' + '/modules/**/*.jade'],
        tasks: ['buildComponentList']
    },
    js: {
        files: ['<%= config.srcDir %>' + '/**/*.js'],
        tasks: ['copy:js','copy:modulesjs']
    }
};

