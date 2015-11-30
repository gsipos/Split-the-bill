'use strict';

var gulp = require('gulp');
var del = require('del');

var paths = gulp.paths;

gulp.task('clean', function() {
	del([paths.builtDir+'/']);
});

gulp.task('html', function () { 
	return gulp.src(paths.clientSrc + '/**/*.html')
		.pipe(gulp.dest(paths.built.client+'/'));
});

gulp.task('build', ['scripts']);