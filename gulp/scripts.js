'use strict';

var gulp = require('gulp');
var ts = require('gulp-typescript');

var paths = gulp.paths;

var clientProject = ts.createProject('src/client/tsconfig.json');
var serverProject = ts.createProject('src/server/tsconfig.json');

gulp.task('client-scripts', function () {
	return gulp.src([paths.clientSrc + '/**/*.ts'])
		.pipe(ts(clientProject))
		.pipe(gulp.dest('.'));
});

gulp.task('server-scripts', function () {
	return gulp.src([paths.serverSrc + '/**/*.ts'])
		.pipe(ts(serverProject))
		.pipe(gulp.dest(''));
});

gulp.task('scripts', ['client-scripts', 'server-scripts']);