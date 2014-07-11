module.exports = {
  yourTarget: {
    options: {
      root: 'dist'
    },
    files: [{
      expand: true,
      cwd: 'dist',
      src: ['*.css', '*.html'],
      dest: 'dist'
    }]
  }
};
