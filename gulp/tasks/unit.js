const argv = require('yargs').argv;

module.exports = (gulp, $, config) => {
  const scriptsSpec = config.watchGlobs.scriptsSpec;
  const scripts = config.watchGlobs.scripts;
  const rootDir = config.entryPaths.root;
  const covererageGlob = scripts
    // concat scriptsSpec but prepend it with '!' so spec files don't count for the coverage report
    .concat(scriptsSpec.map(c => `!${c}`))
    // remove rootDir from path
    .map(p => p.replace(rootDir, ''));

  const task = () =>
    gulp.src(rootDir)
      // we merge argv so we can override the configs via the command line
      // e.g.: npm test -- --watchAll
      .pipe($.jest.default(Object.assign({}, argv || {
        config: {
          collectCoverage: true,
          coverageReporters: [
            'text',
            'text-summary',
            'json',
            'lcov',
          ],
          collectCoverageFrom: covererageGlob
        }
      })))
      ;

  task.description = 'Cleans the build folder';
  return task;
};
