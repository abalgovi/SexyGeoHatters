'use strict';

// gulpfile.js
var gulp = require('gulp');
var child_process = require('child_process');
var jshint = require('gulp-jshint');
var jsdoc = require('gulp-jsdoc3');
var util = require('gulp-util');
var server = require('gulp-express');
var browserSync = require('browser-sync');
var mongobackup = require('mongobackup');

var plugins= require('gulp-load-plugins')({
	pattern: ['gulp-*', 'gulp.*', 'check-*', 
	'jasmine-*', 'mongobackup', 'yargs'],
	scope: ['dependencies', 'devDependencies'],
	lazy: false

});


var exec = require('child_process').exec;

function execute(command, callback) {
    exec(command, function(error, stdout, stderr){callback(stdout);});
}

//// these plugins are added first, but still need for
//// dev team to group files by types to make it happen
//// such as .js folder, .css folder, build folder

//var minifyCSS = require('gulp-minify-css');


//// end of additional plugins


//// begin of additional plugins


gulp.task('clean', function () {
  return gulp.src('build', {read: false})
    .pipe(plugins.clean());
});


gulp.task('lint', function(){
	return gulp.src(['routes/api/appointment/appointment.controller.js',
			 'routes/api/business/business.controller.js',
		  	 'routes/api/example/example.controller.js',
		  	 'routes/api/form/form.controller.js',
			 'app.js'])
				  .pipe(jshint({esversion: 6, node: true}))
				  .pipe(jshint.reporter('default'));
});

gulp.task('jsdocs',function(cb) {
	gulp.src(['routes/api/appointment/appointment.controller.js',
		  'routes/api/business/business.controller.js',
		  'routes/api/example/example.controller.js',
		  'routes/api/form/form.controller.js',
		  '']).pipe(jsdoc(cb));
});

gulp.task('vendor', function() {
  return gulp.src('./public/javascripts/*.js')
    .pipe(plugins.concat('vendor.js'))
    .pipe(gulp.dest('./public/javascripts/'))
    .pipe(plugins.uglify())
    .pipe(plugins.rename('vendor.min.js'))
    .pipe(gulp.dest('./public/javascripts/'))
    .on('error', plugins.util.log);
});

//gulp.task('build', ['vendor'], function() {
gulp.task('build-concat', ['vendor'], function() {
  return gulp.src('./public/stylesheets/*.css')
	.pipe(plugins.minifyCss({keepBreaks:false}))
    	.pipe(plugins.rename('style.min.css'))
    	.pipe(gulp.dest('./build/concat/stylesheets/'));
	});

gulp.task('compress', function() {
  gulp.src('./public/javascripts/*.js')
    .pipe(plugins.uglify())
    .pipe(plugins.rename(function (path) {
        path.basename += ".min";
    }))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('build', ['compress'], function() {
  return gulp.src('./public/stylesheets/*.css')
    .pipe(plugins.minifyCss({keepBreaks:false}))
    .pipe(plugins.rename(function (path) {
        path.basename += ".min";
    }))
    .pipe(gulp.dest('./build/css'));

    //.pipe(minifyCSS({keepBreaks:false}))
    //.pipe(rename('style.min.css'))
    //.pipe(gulp.dest('./public/stylesheets/'))
});

//// end of additional plugins
gulp.task('nodemon', ['lint'], function (cb) {
  var called = false;
  return plugins.nodemon({

    // nodemon our expressjs server
     script: 'bin/www',
    // script: '/Users/Seiji/Desktop/team2/bin/www',
    // watch core server file(s) that require server restart on change
    watch: ['./routes/'],

    ext: 'html js',
    env: { 'NODE_ENV': 'development' }
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      browserSync.reload({
        stream: true
      });
    });
});

/*gulp.task('mongostart', function() {
    child_process.exec('mongod --dbpath db', function(err, stdout, stderr) {
        if(err) {
            console.log(err.stack);
            console.log("Error code: " + err.code);
            console.log("Signal received: " + err.signal);
        }
    });
});

gulp.task('mongoend', function() {

    child_process.exec("mongo --eval 'db.shutdownServer()' admin", function(err, stdout, stderr) {
        if(err) {
            console.log(err.stack);
            console.log("Error code: " + err.code);
            console.log("Signal received: " + err.signal);
        }
    });
});*/

gulp.task('browser-sync', ['nodemon'/*, 'mongostart', 'watch-check'*/], function () {

  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync.init({

    // watch the following files; changes will be injected (css & images) or cause browser to refresh
    files: ['public/**/*.*', 'views/**/*.*', 'public/javascripts/*.js'],

    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:3000',

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 4000,

    //Change whether browser will auto open
    open: true,

    // open the proxied app in chrome
    //browser: ['google chrome']
  });
});

// mongodump - dump all databases on localhost
gulp.task('mongodump', function() {
  mongobackup.dump({
    host : 'localhost',
    out : './dumps/mongo'
  });
});

// mongorestore - restore database to localhost
gulp.task('mongorestore', function() {
  mongobackup.restore({
    host : 'localhost',
    drop : true,
    path : './dumps/mongo'
  });
});



gulp.task('default', ['browser-sync','jsdocs','lint']);
