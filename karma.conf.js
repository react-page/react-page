var webpack = require('webpack'),
    path = require('path');

// Karma configuration
// Generated on Mon May 11 2015 14:13:57 GMT-0600 (MDT)

module.exports = function (config) {
    config.set({
        basePath: './',
        frameworks: ['jasmine', 'browserify'],
        files: [
            'test/**/*.js',
            {
                pattern: 'src/app/**.js',
                watched: true, included: false, served: false
            }
        ],
        preprocessors: {
            'test/**/*.js': ['browserify'],
            'src/app/**.js': ['browserify', 'coverage']
        },
        browserify: {
            debug: true,
            transform: ['babelify',[{global: true}, 'deamdify'], 'browserify-css', 'browserify-istanbul'],
            extensions: ['.js'],
            paths: ['./src']
        },
        plugins: [
            require('karma-browserify'),
            require('karma-babel-preprocessor'),
            require('karma-jasmine'),
            require('karma-coverage'),
            require('karma-chrome-launcher'),
            require('karma-firefox-launcher'),
            require('karma-safari-launcher')
            // TODO add opera launcher: https://github.com/ory-am/editor/issues/5
            // TODO add IE launcher: https://github.com/ory-am/editor/issues/6
        ],
        coverageReporter: {
            dir: 'coverage/',
            sourceStore: require('istanbul').Store.create('fslookup'),
            reporters: [{type: 'lcov', subdir: '.'}]
        },
        reporters: [
            'dots',
            'coverage'
        ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    });
};
