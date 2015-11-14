'use strict';

var gulp = require('gulp');

gulp.paths = {
  src: 'src',
  clientSrc : 'src/client',
  serverSrc : 'src/server',
  dist: 'dist',
  tmp: '.tmp',
  builtDir: 'built',
  built: {
    client: 'built/client',
    server: 'built/server'
  }
};

require('require-dir')('./gulp');

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});