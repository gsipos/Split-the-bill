'use strict';

var gulp = require('gulp');

gulp.paths = {
  src: 'src',
  clientSrc : 'src/client',
  serverSrc : 'src/server',
  dist: 'dist',
  tmp: '.tmp',
  built: 'built',
  builtClient: 'built/client'
};

require('require-dir')('./gulp');

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});