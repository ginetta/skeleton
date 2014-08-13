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
        tasks: ['pagesAssembler:dev']
    },
    js: {
        files: ['<%= config.srcDir %>' + '/**/*.js'],
        tasks: ['copy:js','copy:componentsjs']
    },
    data: {
        files: ['<%= config.srcDir %>/<%= config.localesDir %>' + '/**/*.json',
                '<%= config.srcDir %>/components/**/package.json'],
        tasks: ['pagesAssembler:dev']
    }
};

