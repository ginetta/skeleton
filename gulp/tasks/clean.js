const del = require('del');

module.exports = (gulp, $, config) => {
  const destFolder = `${config.basePaths.dest}*`;

  const task = () => del([destFolder]);

  task.description = 'Cleans the build folder';
  return task;
};
