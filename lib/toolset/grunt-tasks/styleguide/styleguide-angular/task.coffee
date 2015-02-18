jade = require('jade')
_    = require('lodash')

module.exports = (grunt, options)  ->
  # Config Variables
  srcDir     = options.config.srcDir
  targetDir  = options.config.targetDir

  baseWidgetsDir = 'styleguide/widgets/src/'
  baseWidgetsDst = 'styleguide/widgets/dist/'


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
      templateDst     = baseWidgetsDir + component.name + '/template.html'
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


  createArtifact = (components) ->

    cacheTemplates()
    copyScripts(components)

    artifactSrc = 'lib/toolset/grunt-tasks/styleguide/styleguide-angular/widgets-module.template.js'
    artifactDst = baseWidgetsDst + 'widgets-directives.js'
    template = grunt.file.read(artifactSrc)
    angularModules = ['app.widgets.templates']
    components.forEach (component) ->
      angularModules.push('app.widgets.' + component.name)

    artifactContents = template.replace('__SUBMODULES__', JSON.stringify(angularModules))
    grunt.file.write(artifactDst, artifactContents)
    console.log('template', artifactContents)




  grunt.registerTask "styleguide-angular", ->
    # Parse widgets metadata
    components = parseAngularComponentsMetadata()

    # Compile widgets templates
    compileTemplates(components)

    # create artifacts into styleguide/dist folder
    createArtifact(components)
