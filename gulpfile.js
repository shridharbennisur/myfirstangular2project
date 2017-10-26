const jshint = require('gulp-jshint');
const gulp = require('gulp');
const stylish = require('jshint-stylish');
var run = require('gulp-run');
var cron = require('node-cron');
var open = require('gulp-open');
var os = require('os');

const bas_dir = '/home/costrategix/';
const path_dir = '/public/js/*.js';

/**
 * task to find bugs in js file
 * type in command to check bugs in your js files 
 * ex: gulp lint --option uncertainity-protectivelife 
 * ex for checking errors in uncertainity-protectivelife project
 * */
gulp.task('lint', function () {
  return gulp.src(bas_dir + process.argv[4] + path_dir)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('hello', function () {
  console.log(process.argv[4]);
  console.log("hello world");
});

// gulp.task('run-apache2-commond', function() {
//     return run('sudo service apache2 stop').exec()    // prints "Hello World\n". 
//     .pipe(gulp.dest('output'))      // writes "Hello World\n" to output/echo. 
//   ;
// });

gulp.task('run-command', function () {
  return run('sudo service apache2 stop && sudo service nginx start').exec() // prints "Hello World\n". 
    .pipe(gulp.dest('output')) // writes "Hello World\n" to output/echo. 
  ;
});

// var tas = cron.schedule('* * * * *', function(){
//   console.log('running a task every minute');
// });

/**
 * task to export daily log mails in uncertainty and expensesmatter
 * type gulp dbexport --option uncertainty or expensesmatter
 */
gulp.task('dbexport', function () {
  var hostName = process.argv[4] == 'uncertainty' ? 'uncertainty.local' : 'vul.local';
  var options = {
    uri: 'http://'+hostName+'/api/db/export/' + process.argv[4],
    app: 'google-chrome'
  };
  gulp.src('')
    .pipe(open(options));

});



///home/costrategix/uncertainity-protectivelife/public/js/*.js
