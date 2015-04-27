module.exports = {
    options: {
        livereload: true
    },
    css: {
        files: [
            '<%= config.srcDir %>' + '/css/**',
            '<%= config.srcDir %>' + '/**/*.scss',
            '<%= config.libDir %>/toolset/grunt-tasks/assembler/**/*.scss'
        ],
        tasks: ['sass', 'autoprefixer']
    },
    jade: {
        files: ['<%= config.srcDir %>' + '/**/*.jade'],
        tasks: ['pagesAssembler:dev', 'styleguideAssembler', 'stylesAssembler']
    },
    js: {
        files: ['<%= config.srcDir %>' + '/**/*.js'],
        tasks: ['copy:js','copy:componentsjs']
    },
    data: {
        files: ['<%= config.srcDir %>/<%= config.localesDir %>' + '/**/*.json',
                '<%= config.srcDir %>/components/**/package.yml'],
        tasks: ['pagesAssembler:dev', 'styleguideAssembler']
    },
    styleguideJade: {
      files: ['lib/toolset/**/*.jade'],
      tasks: ['styleguideAssembler', 'stylesAssembler']
    }
};
