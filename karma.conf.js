var path = require('path');
var webpackConfig = require('./webpack.config');

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    frameworks: ['mocha', 'chai'], // frameworks used in testing (jasmin/mocha/chai)

    // list of files / patterns to load in the browser
    files: [
      './node_modules/jquery/dist/jquery.js',
      './client/src/**/*.spec.js'
    ],
    webpack: webpackConfig, // this loads the bundle for the app

    // list of files to exclude
    exclude: [],

    preprocessors: {
      '**/*.spec.js': ['webpack']
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    autoWatch: true, // watch and auto-rebuild / re-test

    reporters: ['mocha'], // using mocha reporter

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'PhantomJS'],

    singleRun: process.env.TRAVIS || false, // set to true for ContinuousIntegration

    plugins: [
      'karma-webpack',
      'karma-chai',
      'karma-mocha',
      'karma-chrome-launcher',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher'
    ]
  });
};
