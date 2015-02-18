module.exports =
  options:
    bundleExec: true
  dev:
    options:
      style: 'expanded'
      require: 'sass-globbing'
      loadPath: ['lib/bower_components', '<%= config.libDir %>/toolset/grunt-tasks/assembler']
    files: [{
      expand: true
      cwd: '<%= config.srcDir %>/css'
      src: ['**/*.scss']
      dest: '<%= config.targetDir %>/css'
      ext: '.css'
    }]
