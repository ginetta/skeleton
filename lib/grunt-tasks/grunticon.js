module.exports = {
    options: {
        cssprefix: '.icon-',
        enhanceSVG: true
    },
    dev: {
        files: [{
            src    : ['*.svg', '*.png'],
            cwd    : '<%= config.srcDir %>' + '/' + '<%= config.assetsDir %>' + '/icons',
            dest   : '<%= config.targetDir %>' + '/css/icons',
            expand : true
        }]
    },
    prod: {
        files: [{
            src    : ['*.svg', '*.png'],
            cwd    : '<%= config.targetDir %>' + '/' + '<%= config.assetsDir %>' + '/icons',
            dest   : '<%= config.targetDir %>' + '/css/icons',
            expand : true
        }]
    }
};
