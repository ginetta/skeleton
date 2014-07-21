module.exports = {
    options: {
        port: 9000,
        livereload: 35729,
        hostname: 'localhost',
    },
    server: {
        options: {
            open: 'http://localhost:9000/en/docs',
            base: ['<%= config.targetDir %>']
        }
    }
};

