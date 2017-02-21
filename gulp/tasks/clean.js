const del = require('del');

module.exports = (gulp, $, config) => {
  const dest = config.skeletonConfig.base.dest;

  const task = () => del([dest]);

  task.description = 'Cleans the build folder';
  return task;
};
