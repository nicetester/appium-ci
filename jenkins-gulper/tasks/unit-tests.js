"use strict";

var gulp = require('gulp'),
    utils = require('../lib/utils'),
    path = require('path'),
    _ = require('underscore');

gulp.task('run-unit-tests',
    ['prepare-dirs', 'appium-npm-install'],function () {

  var env = _.clone(process.env);
  env.MOCHA_REPORTER = 'mocha-jenkins-reporter';
  env.JUNIT_REPORT_PATH = path.resolve(
    global.outputDir,
    'report' + ((env.BUILD_NUMBER) ? '-' + env.BUILD_NUMBER : '') +'.xml');
  env.JUNIT_REPORT_STACK = 1;

  return utils.smartSpawn(
    path.resolve(global.appiumRoot, 'node_modules/.bin/gulp'),
    ['--color'],
    {
      print: 'Running Appium unit tests',
      cwd: global.appiumRoot,
      env: env,
   }
  ).promise;
});

