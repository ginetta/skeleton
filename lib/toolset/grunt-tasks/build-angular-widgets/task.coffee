jade = require('jade')
_    = require('lodash')

module.exports = (grunt, options)  ->
  # Config Variables
  srcDir     = options.config.srcDir
  targetDir  = options.config.targetDir

  tmpBase                = '.tmp/'
  destBase               = 'styleguide/'
  widgetsCodeDest        = 'widgets/'


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
    components.forEach (component) ->
      templateSrc     = component.basePath + component.name + '.jade'
      templateDst     = destBase + widgetsCodeDest + component.name + '/template.html'
      templateContent = jade.renderFile(templateSrc, { pretty: true })
      grunt.file.write(templateDst, templateContent)

  cacheTemplates = ->
    config =
      ngtemplates:
        widgets:
          src: widgetsCodeDest + '**/*.html'
          dest: tmpBase + 'templates.js'
          cwd: destBase
          options:
            module: 'app.widgets.templates'
    grunt.config.merge(config)
    grunt.task.run(['ngtemplates:widgets'])


  copyScripts = (components) ->
    config =
      copy: {}
    components.forEach (component) ->
      scriptSrc = component.basePath + component.name + '.js'
      scriptDst = destBase + widgetsCodeDest + component.name + '/' + component.name + '.js'

      config.copy['styleguide-' + component.name] = {}
      config.copy['styleguide-' + component.name].src  = scriptSrc
      config.copy['styleguide-' + component.name].dest = scriptDst

    grunt.config.merge(config)

    copyTasksNames = _.keys(config.copy).map (target) -> 'copy:' + target
    grunt.task.run(copyTasksNames)

  createMainModule = (components) ->
    artifactSrc = 'lib/toolset/grunt-tasks/build-angular-widgets/widgets-module.template.js'
    artifactDst = destBase + widgetsCodeDest + 'directives.js'
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
          src:  [
            destBase + widgetsCodeDest + '**/*.js',
            tmpBase + 'templates.js'
          ]
          dest: destBase + 'widgets.js'

    grunt.config.merge(config)
    grunt.task.run('concat:widgetsArtifact')

  compileStyles = () ->
    config =
      sass:
        widgetsStyles:
          expand: true
          cwd: '<%= config.srcDir %>/css'
          src: ['**/*.scss']
          dest: tmpBase
          ext: '.css'
      rename:
        widgetsStyles:
          src:  tmpBase  + 'main.css'
          dest: destBase + 'widgets.css'

    grunt.config.merge(config)
    grunt.task.run(['sass:widgetsStyles', 'rename:widgetsStyles'])


  grunt.registerTask "build-angular-widgets", ->
    # Parse widgets metadata
    components = parseAngularComponentsMetadata()

    # Templates
    compileTemplates(components) # JADE   ==> HTML
    cacheTemplates()             # HTML's ==> $templateCache

    # Styles
    compileStyles()             # SASS    ==> CSS

    # Scripts
    copyScripts(components)


    # Group widgets directives and templates into a single widgets module
    createMainModule(components)
    concatScripts()
