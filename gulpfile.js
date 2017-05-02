'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jsdoc = require('gulp-jsdoc3');
var mocha = require('gulp-mocha');
var util = require('gulp-util');


gulp.task('docs', function (cb){
    gulp.src('./routes/*.js')
    .pipe(jsdoc(cb));
});

gulp.task('lint', function(){
	return gulp.src(['routes/*.js','models/*.js','app.js'])
				  .pipe(jshint({esversion: 6}))
				  .pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
	return gulp.src(['test/*.js'], { read: false })
        .pipe(mocha({ reporter: 'list' })) 
        .on('error', util.log);
});

// run when you only type gulp into command line with no parameters
gulp.task('default', ['lint','docs','test']);
