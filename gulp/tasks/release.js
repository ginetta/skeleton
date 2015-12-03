'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var logger = require('gulplog');
var releaseBranch = 'master';
var releaseCommitMessage = 'New release version';

// Makes sure we do this on the master branch
var verifyBranch = function() {
  $.git.revParse({args:'--abbrev-ref HEAD', quiet: true}, function(err, currentBranch)  {
    if (currentBranch != releaseBranch) {
      logger.error('ERR: You need to be on the %s branch to be able to deploy', releaseBranch);
      process.exit(0);
    }
  })
}
verifyBranch.displayName = 'Verify branch';

// Defaults to minor for now (better than no version bump)
// TODO:
// - get the bumptype from params
// - make that a requirement (no default)
var getBumpType = function() {
  // var argv = require('yargs')
  //           .demand('bumpType', 'Usage: --bumpType={patch, minor, major}').argv;
  return 'minor'
}

// Bumps the version on package.json and commits it locally and pushes to master
var bumpVersion = function() {
  return gulp.src('./package.json')
    .pipe($.bump({type: getBumpType()}))
    .pipe(gulp.dest('./'))
    // .pipe($.git.add())
    // .pipe($.git.commit(releaseCommitMessage))
}
bumpVersion.displayName = 'Bump version';

// Merges to the releases branch, tags the version on git and pushes it to github
var publishRelease = function(done) {
  done();
}
publishRelease.displayName = 'Publish release';

// Commits the build folder to another branch and pushes it to github
var publishBuild = function(done) {
  done();
}
publishBuild.displayName = 'Publish build release';


var releaseTask = function () {
  verifyBranch();
  return new Promise(gulp.series(bumpVersion, publishRelease, publishBuild));
}

releaseTask.description = 'Makes a new release of the website';

module.exports = function(gulp, $, config) {
  return releaseTask;
};
