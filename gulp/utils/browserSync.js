'use strict';
var browserSync = require('browser-sync').create();

// This module makes sure we keep a single instance of browserSync
module.exports = {
  start: function(serverBase) {
    if (browserSync.active) {
      browserSync.reload();
    } else {
      browserSync.init({
        server: serverBase,
        index:  'index.html'
      });
    }
  },
  notify: browserSync.notify,
  stream: browserSync.stream,
  reload: function (done) {
    browserSync.reload();
    done();
  }
};
