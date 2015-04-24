module.exports =
  options:
    bundleExec: true
    style: 'expanded'
    require: 'sass-globbing'
    loadPath: [
      'lib/bower_components',
      '<%= config.libDir %>/toolset/grunt-tasks/assembler',
      '<%= config.srcDir %>/css']
  dev:
    files: [
      {
        expand: true
        cwd: '<%= config.srcDir %>/css'
        src: ['**/*.scss']
        dest: '<%= config.targetDir %>/css'
        ext: '.css'
      },
      {
        src: '<%= config.libDir %>/toolset/grunt-tasks/assembler/styleguide.css.scss',
        dest: '<%= config.targetDir %>/css/styleguide.css'
      }
    ]

