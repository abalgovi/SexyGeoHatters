'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jsdoc = require('gulp-jsdoc3');



gulp.task('docs', function (cb){
    gulp.src('./routes/*.js')
    .pipe(jsdoc(cb));
});

gulp.task('lint', function(){
	return gulp.src(['routes/*.js','models/*.js','app.js'])
				  .pipe(jshint({esversion: 6}))
				  .pipe(jshint.reporter('default'));
});


// run when you only type gulp into command line with no parameters
gulp.task('default', ['lint','docs']);
