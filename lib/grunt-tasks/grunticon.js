module.exports = {
    options: {
        datasvgcss: 'icons.data.svg.scss',
        cssprefix: '.icon-'
    },
    dev: {
        files: [{
            src    : ['*.svg', '*.png'],
            cwd    : '<%= config.srcDir %>' + '/img/icons',
            dest   : '<%= config.srcDir %>' + '/img/icons-rendered',
            expand : true
        }]
    },
    prod: {
        files: [{
            src    : ['*.svg', '*.png'],
            cwd    : '<%= config.targetDir %>' + '/img/icons',
            dest   : '<%= config.srcDir %>' + '/img/icons-rendered',
            expand : true
        }]
    }
};