jade = require('jade')
_    = require('lodash')

module.exports = (grunt, options)  ->
  # Config Variables
  srcDir     = options.config.srcDir

  destBase = 'styleguide/'
  base     = 'lib/toolset/grunt-tasks/styleguide/styleguide-angular/styleguide-template/'

  parseAngularComponentsMetadata = ->
    componentsMetadata = []
    grunt.file.glob.sync(srcDir + '/components/**/package.yml').forEach  (path) ->
      componentData = grunt.file.readYAML(path)
      name = componentData.name
      if componentData.type && componentData.type == "angular"
        componentData.basePath = path.replace('package.yml', '')
        componentsMetadata.push(componentData)

    return componentsMetadata

  createComponentsDataFile = (components) ->
    grunt.file.write('styleguide/data/components.json', JSON.stringify(components));

  createStylesDataFile = () ->
    baseStylesPath = srcDir + '/css/styles/'

    config =
      copy:
        typographyConfig:
          cwd: baseStylesPath + 'typography'
          expand: true
          src: '*.json'
          dest: destBase + 'data'
        colorsConfig:
          cwd: baseStylesPath + 'colors'
          expand: true
          src: '*.json'
          dest: destBase + 'data'

    grunt.config.merge(config)
    grunt.task.run(['copy:typographyConfig', 'copy:colorsConfig'])




  compileStyleguideTemplates = () ->
    config =
      copy:
        styleguideTemplate:
          src: '**/*.js'
          dest: destBase
          expand: true
          cwd: base

    grunt.config.merge(config)
    grunt.task.run(['copy:styleguideTemplate'])
    grunt.file.glob.sync(base + '**/*.jade').forEach  (path) ->
      dest = destBase + path.replace(base, '').replace('.jade', '.html')
      templateContent = jade.renderFile(path, { pretty: true })
      grunt.file.write(dest, templateContent)


  compileStyleguideStyles = ->
    config =
      sass:
        styleguideAngular:
          expand: true
          cwd: base
          src: ['styleguide.scss']
          dest: destBase + 'css/'
          ext: '.css'

    grunt.config.merge(config)
    grunt.task.run(['sass:styleguideAngular'])


  grunt.registerTask "styleguide-angular", ->
    # Parse widgets metadata
    components = parseAngularComponentsMetadata()

    # create artifacts into styleguide/dist folder
    createComponentsDataFile(components)
    createStylesDataFile()


    compileStyleguideTemplates()
    compileStyleguideStyles()
