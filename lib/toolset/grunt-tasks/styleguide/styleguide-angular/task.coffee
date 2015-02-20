jade = require('jade')
_    = require('lodash')

module.exports = (grunt, options)  ->
  # Config Variables
  srcDir     = options.config.srcDir
  targetDir  = options.config.targetDir

  baseWidgetsDst         = 'styleguide/widgets/'
  finalArtifactDst       = 'styleguide/widgets.js'
  finalArtifactDstStyles = 'styleguide/widgets.css'


  parseAngularComponentsMetadata = ->
    componentsMetadata = []
    grunt.file.glob.sync(srcDir + '/components/**/package.yml').forEach  (path) ->
      componentData = grunt.file.readYAML(path)
      name = componentData.name
      if componentData.type && componentData.type == "angular"
        componentData.basePath = path.replace('package.yml', '')
        componentsMetadata.push(componentData)

    return componentsMetadata


  compileTemplates = (components) ->
    console.log('compiling templates')
    components.forEach (component) ->
      templateSrc     = component.basePath + component.name + '.jade'
      templateDst     = baseWidgetsDst + component.name + '/template.html'
      templateContent = jade.renderFile(templateSrc, { pretty: true })
      grunt.file.write(templateDst, templateContent)

  cacheTemplates = ->
    grunt.task.run(['ngtemplates:widgets'])


  copyScripts = (components) ->
    console.log('copying scripts')
    config = { copy: {} }
    components.forEach (component) ->
      scriptSrc = component.basePath + component.name + '.js'
      scriptDst = baseWidgetsDst + component.name + '/' + component.name + '.js'

      config.copy['styleguide-' + component.name] = {}
      config.copy['styleguide-' + component.name].src  = scriptSrc
      config.copy['styleguide-' + component.name].dest = scriptDst

    grunt.config.merge(config)

    copyTasksNames = _.keys(config.copy).map (target) -> 'copy:' + target
    grunt.task.run(copyTasksNames)

  createMainModule = (components) ->
    artifactSrc = 'lib/toolset/grunt-tasks/styleguide/styleguide-angular/widgets-module.template.js'
    artifactDst = baseWidgetsDst + 'directives.js'
    template = grunt.file.read(artifactSrc)
    angularModules = ['app.widgets.templates']
    components.forEach (component) ->
      angularModules.push('app.widgets.' + component.name)

    artifactContents = template.replace('__SUBMODULES__', JSON.stringify(angularModules))
    grunt.file.write(artifactDst, artifactContents)

  concatScripts = () ->
    config =
      concat:
        widgetsArtifact:
          src:  [ baseWidgetsDst + '**/*.js', 'styleguide/templates.js' ]
          dest: finalArtifactDst

    grunt.config.merge(config)
    grunt.task.run('concat:widgetsArtifact')

  compileStyles = () ->
    grunt.task.run(['sass:styleguide'])
    config =
      copy:
        styleguideStyles:
          src:  '.tmp/styleguide/css/main.css'
          dest: finalArtifactDstStyles
    grunt.config.merge(config)
    grunt.task.run(['copy:styleguideStyles'])
    grunt.task.run(['sass:styleguideTemplate'])


  createComponentsDataFile = (components) ->
    grunt.file.write('styleguide/data/components.json', JSON.stringify(components));

  createStylesDataFile = () ->
    baseStylesPath = srcDir + '/css/styles/'
    console.log baseStylesPath

    config =
      copy:
        typographyConfig:
          cwd: baseStylesPath + 'typography'
          expand: true
          src: '*.json'
          dest: 'styleguide/data'
        colorsConfig:
          cwd: baseStylesPath + 'colors'
          expand: true
          src: '*.json'
          dest: 'styleguide/data'

    grunt.config.merge(config)
    grunt.task.run(['copy:typographyConfig', 'copy:colorsConfig'])

  createArtifacts = (components) ->
    compileStyles()
    cacheTemplates()
    copyScripts(components)
    createMainModule(components)
    concatScripts()
    createComponentsDataFile(components)
    createStylesDataFile()



  copyStyleguideTemplate = () ->
    console.log('copyStyleguideTemplate')
    config =
      copy:
        styleguideTemplate:
          src: '**/*.js'
          dest: 'styleguide/'
          expand: true
          cwd: 'lib/toolset/grunt-tasks/styleguide/styleguide-angular/styleguide-template/'

    grunt.config.merge(config)
    grunt.task.run(['copy:styleguideTemplate'])
    styleguideTemplateBase = 'lib/toolset/grunt-tasks/styleguide/styleguide-angular/styleguide-template/'
    grunt.file.glob.sync(styleguideTemplateBase + '**/*.jade').forEach  (path) ->
      dest = 'styleguide/' + path.replace(styleguideTemplateBase, '').replace('.jade', '.html')
      templateContent = jade.renderFile(path, { pretty: true })
      grunt.file.write(dest, templateContent)



  grunt.registerTask "styleguide-angular", ->
    # Parse widgets metadata
    components = parseAngularComponentsMetadata()

    # Compile widgets templates
    compileTemplates(components)

    # create artifacts into styleguide/dist folder
    createArtifacts(components)


    copyStyleguideTemplate()
