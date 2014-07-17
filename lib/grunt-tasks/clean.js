module.exports = {
    dist:       ['<%= config.targetDir %>'],
    icons:      ['<%= config.targetDir %>' + '/img/'],
    js:         ['<%= config.targetDir %>' + '/js/'],
    css:        ['<%= config.targetDir %>' + '/css/'],
    html:       ['<%= config.targetDir %>' + '/**/*.html'],
    sytleguide: ['<%= config.componentListDir %>' + '/**/*.html'],
    bower:      ['<%= config.targetDir %>' + '/bower_components']
};
