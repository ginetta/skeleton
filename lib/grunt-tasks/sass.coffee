module.exports =
  options:
    bundleExec: true
    style: 'expanded'
    require: 'sass-globbing'
    loadPath: ['lib/bower_components', '<%= config.libDir %>/toolset/grunt-tasks/assembler', '<%= config.srcDir %>/css']
  dev:
    files: [{
      expand: true
      cwd: '<%= config.srcDir %>/css'
      src: ['**/*.scss']
      dest: '<%= config.targetDir %>/css'
      ext: '.css'
    }]
  styleguide:
    files: [{
      expand: true
      cwd: '<%= config.srcDir %>/css'
      src: ['**/*.scss']
      dest: '.tmp/styleguide/css'
      ext: '.css'
    }]
  styleguideTemplate:
    files: [{
      expand: true
      cwd: 'lib/toolset/grunt-tasks/styleguide/styleguide-angular/styleguide-template'
      src: ['**/*.scss']
      dest: 'styleguide/css'
      ext: '.css'
    }]

