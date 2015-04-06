'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('basic-webapp:app', function () {
    before(function (done) {
        this.timeout(10000);
        helpers.run(path.join(__dirname, '../app'))
            .inDir(path.join(os.tmpdir(), './temp-test'))
            .withOptions({ 'skip-install': true })
            .withPrompt({
                appName: 'Test',
                appDescription: 'Running test',
                appLicense: 'MIT',
                authorName: 'Test Script'
            })
            .on('end', done);
    });

    it('creates files', function () {
        assert.file([
            '.editorconfig',
            '.jshintrc',
            '.gitignore',
            '.bowerrc',
            '.gitattributes',
            'bower.json',
            'package.json',
            'Gruntfile.js',
            'src/index.html',
            'README.md',
            'server.js',
            'requireconfig.js',
            'src/scripts/main.js',
            'src/styles/main.css'
        ]);
    });
});
