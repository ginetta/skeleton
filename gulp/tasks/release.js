'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var logger = require('gulplog');
var inquirer = require('inquirer');
var exec = require('child_process').spawn;

var allowedBranch = 'master';
var bumpTypeQuestion =  {
  type: 'list',
  name: 'bump',
  message: 'What type of bump would you like to do?',
  default: 'minor',
  choices: ['patch', 'minor', 'major']
};

// Makes sure we do this on the master branch
var asserBranchAllowed = function(done) {
  $.git.revParse({args:'--abbrev-ref HEAD', quiet: true}, function(err, currentBranch)  {
    // if (currentBranch != allowedBranch) {
    //   logger.error('ERR: You need to be on the %s branch to be able to deploy', allowedBranch);
    //   process.exit(1);
    // }
    done();
  });

}
asserBranchAllowed.displayName = 'Verify branch';

// Asks for the bump type
var askBumpType = function(done) {
  inquirer.prompt([bumpTypeQuestion], function( answers ) {
    if (answers !== null && answers[bumpTypeQuestion.name] !== null) {
      try {
        bumpVersion(answers[bumpTypeQuestion.name], done);
      } catch (e) {
        done();
      }

    } else {
      logger.error('ERR: There was an error with the provided bump type');
      done();
    }
  });
}
askBumpType.displayName = 'Ask bump type';

// Bumps the version of the project
var bumpVersion = function(bumpType, cb) {
  var options = { stdio: ['ignore', 'ignore',process.stderr], cwd: process.cwd()}
  var p = exec('npm', ['version', bumpType], options);
  p.on('close', cb);
}
bumpVersion.displayName = 'Bump Version';

// Bumps the version on package.json and commits it locally and pushes to master
var releaseTask = function(done) {
  return new Promise(gulp.series(asserBranchAllowed, askBumpType));
}
releaseTask.description = 'Bumps the npm version';

module.exports = function(gulp, $, config) {
  return releaseTask;
};
