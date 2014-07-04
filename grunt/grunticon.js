module.exports = {
    icons: {
        files: [{
            src    : ['*.svg', '*.png'],
            cwd    : '<%= config.srcDir %>' + '/img/icons',
            dest   : '<%= config.srcDir %>' + '/img/icons-rendered',
            expand : true
        }],
        options: {
            datasvgcss: 'icons.data.svg.scss',
            cssprefix: '.icon-'
        }
    }
};