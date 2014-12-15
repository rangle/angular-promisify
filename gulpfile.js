'use strict';

var gulp = require('gulp');
var rg = require('rangle-gulp');

var karmaVendorFiles = [
  'bower_components/angular/angular.js',
  'bower_components/angular-mocks/angular-mocks.js',
  'bower_components/sinon-chai/lib/sinon-chai.js',
  'testing/lib/*.js'
];

var sourceFiles = [
  'src/**/*.js'
];

rg.setLogLevel('info');

gulp.task('karma', rg.karma({
  files: sourceFiles,
  vendor: karmaVendorFiles,
  karmaConf: 'testing/karma-ci.conf.js'
}));

gulp.task('lint', rg.jshint({
  files: sourceFiles
}));

gulp.task('beautify', rg.beautify({
  files: sourceFiles
}));

gulp.task('build', rg.concatAndUglify({
  files: sourceFiles,
  dest: 'dist',
  name: 'denodeify'
}));