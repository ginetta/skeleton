module.exports = {
    allFiles: [
        '<%= config.srcDir %>' + '/css/**',
        '<%= config.srcDir %>' + '/**/*.scss'
    ],
    options: {
        bundleExec: true,
        config: '.scss-lint.yml',
        colorizeOutput: true
    }
};