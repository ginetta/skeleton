module.exports = {
    options: {
        livereload: true
    },
    css: {
        files: [
            '<%= config.srcDir %>' + '/css/**',
            '<%= config.srcDir %>' + '/**/*.scss'
        ],
        tasks: ['compass', 'autoprefixer']
    },
    jade: {
        files: ['<%= config.srcDir %>' + '/**/*.jade'],
        tasks: ['pagesAssembler']
    },
    js: {
        files: ['<%= config.srcDir %>' + '/**/*.js'],
        tasks: ['copy:js','copy:modulesjs']
    },
    data: {
        files: ['<%= config.srcDir %>/<%= config.localesDir %>' + '/**/*.json'],
        tasks: ['pagesAssembler']
    }
};

