'use strict';
var gutil = require('gulp-util');
var rsync = require('rsyncwrapper');


module.exports = function (gulp, $, config) {
  var environment = config.environments.testing;
  var defaultPath = '/home/www-clients/';
  var serverPath = environment.username + '@' + environment.host;
  var deploySrc = config.basePaths.dest;
  var deployDest = serverPath + ':' + defaultPath + environment.projectPath + environment.releasePath;


  var task = function (done) {
    var rsyncOptions = {
      ssh: true,
      src: deploySrc,
      dest: deployDest,
      recursive: true,
      delete: true,
      privateKey: environment.privateKey,
      onStdout: function (data) {
        console.log(data.toString('utf8'));
      },
      onStderr: function (data) {
        gutil.log(data.toString('utf8'));
      },
      args: ['-av']
    };

    if(!environment.username) {
      throw new gutil.PluginError({
        plugin: 'Gulp deploy',
        message: 'You should specify a username for the deployement. ' +
                 'Example: gulp deploy --path=pulls/1 --username=testuser --host=domain.com'
      });
    }

    if(!environment.host) {
      throw new gutil.PluginError({
        plugin: 'Gulp deploy',
        message: 'You should specify a host for the deployement. ' +
                 'Example: gulp deploy --path=pulls/1 --username=testuser --host=domain.com'
      });
    }

    if(!environment.releasePath) {
      throw new gutil.PluginError({
        plugin: 'Gulp deploy',
        message: 'You should specify a path for the deployement. ' +
                 'Example: gulp deploy --path=pulls/1 --username=testuser --host=domain.com'
      });
    }


    rsync(rsyncOptions, function(error, stdout) {
        gutil.log(stdout);
        if(error) {
          gutil.log(error);
        }
        done();
    });
  };

  task.description = 'Deploys to testing';
  return task;
};


