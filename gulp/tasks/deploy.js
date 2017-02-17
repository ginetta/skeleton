const gutil = require('gulp-util');
const rsync = require('rsyncwrapper');

module.exports = (gulp, $, config) => {
  const environment = config.environments.testing;
  const defaultPath = '/home/www-clients/';
  const serverPath = `${environment.username}@${environment.host}`;
  const deploySrc = config.basePaths.dest;
  const deployDest = `${serverPath}:${defaultPath}${environment.projectPath}${environment.releasePath}`;

  const task = (done) => {
    const rsyncOptions = {
      ssh: true,
      src: deploySrc,
      dest: deployDest,
      recursive: true,
      delete: true,
      privateKey: environment.privateKey,
      // eslint-disable-next-line no-console
      onStdout: data => console.log(data.toString('utf8')),
      onStderr: data => gutil.log(data.toString('utf8')),
      args: ['-av'],
    };

    if (!environment.username) {
      throw new gutil.PluginError({
        plugin: 'Gulp deploy',
        message: 'You should specify a username for the deployement. ' +
                 'Example: gulp deploy --path=pulls/1 --username=testuser --host=domain.com',
      });
    }

    if (!environment.host) {
      throw new gutil.PluginError({
        plugin: 'Gulp deploy',
        message: 'You should specify a host for the deployement. ' +
                  'Example: gulp deploy --path=pulls/1 --username=testuser --host=domain.com',
      });
    }

    if (!environment.releasePath) {
      throw new gutil.PluginError({
        plugin: 'Gulp deploy',
        message: 'You should specify a path for the deployement. ' +
                  'Example: gulp deploy --path=pulls/1 --username=testuser --host=domain.com',
      });
    }

    rsync(rsyncOptions, (error, stdout) => {
      gutil.log(stdout);
      if (error) {
        gutil.log(error);
      }
      done();
    });
  };

  task.description = 'Deploys to testing';
  return task;
};
