module.exports =
  options:
    componentsFolder: 'components'
    stylesFolder: 'css'
  dist:
    src  : '<%= config.srcDir %>'
    dest : '<%= config.targetDir %>'
  styleguide:
    src  : '<%= config.srcDir %>'
    dest : 'styleguide'
