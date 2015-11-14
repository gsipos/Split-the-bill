'use strict';

var gulp = require('gulp');
var del = require('del');

var paths = gulp.paths;

gulp.task('clean', function() {
	del([paths.builtDir+'/']);
});


gulp.task('build', ['scripts']);