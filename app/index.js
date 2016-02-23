'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require("chalk");

module.exports = yeoman.generators.Base.extend({
    constructor: function() {
        // Handle argument(s) passed from the command line
        yeoman.generators.Base.apply(this, arguments);
        this.argument('appName', {
            desc: 'The name of the application being created',
            type: String,
            required: false,
        })

        this.option('skip-install', {
            desc: 'Option to skip the installation of dependencies'
        });
    },

    prompting: function() {
        // Greet the user and prompt for input
        var done = this.async();
        this.log(yosay('Basic Web Application Generator'));
        this.log('This will scaffold out a basic web application in the current directory.');
        this.log('Please provide/answer the following:');
        var prompts = [
            {
                type: 'input',
                name: 'appName',
                message: 'Application Name',
                validate: function(input) {
                    if (!input || input.trim() === '') {
                        return "You need to provide a name for your application";
                    }
                    return true;
                },
                when: function() {
                    return (!this.appName);
                }.bind(this)
            },
            {
                type: 'input',
                name: 'appDescription',
                message: 'Application Description'
            },
            {
                type: 'input',
                name: 'appLicense',
                message: 'License',
                default: 'MIT'
            },
            {
                type: 'input',
                name: 'authorName',
                message: 'Author\'s Name',
                store: true
            },
            {
                type: 'input',
                name: 'authorEmail',
                message: 'Author\'s Email',
                store: true
            },
            {
                type: 'confirm',
                name: 'genInstallDeps',
                message: 'Run ' + chalk.yellow('npm install & bower install') + ' upon completion?',
                default: true,
                when: function() {
                    return (!this.options['skip-install']);
                }.bind(this)
            }
        ];
        this.prompt(prompts, function(answers) {
            this.appName = answers.appName || this.appName;
            this.appDescription = answers.appDescription;
            this.appLicense = answers.appLicense;
            this.authorName = answers.authorName;
            this.authorEmail = answers.authorEmail;
            this.genInstallDeps = answers.genInstallDeps;
            done();
        }.bind(this));
    },

    writing: function() {
        this.log('\nScaffolding...');

        // Creating folders
        this.dest.mkdir('src');
        this.dest.mkdir('src/scripts');
        this.dest.mkdir('src/images');
        this.dest.mkdir('src/styles');

        // Copying template files
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            {
                appName: this.appName,
                appDescription: this.appDescription,
                appLicense: this.appLicense,
                authorName: this.authorName,
                authorEmail: this.authorEmail
            }
        );
        this.fs.copyTpl(
            this.templatePath('_bower.json'),
            this.destinationPath('bower.json'),
            {
                appName: this.appName
            }
        );
        this.fs.copyTpl(
            this.templatePath('_README.md'),
            this.destinationPath('README.md'),
            {
                appName: this.appName,
                appDescription: this.appDescription
            }
        );
        this.fs.copyTpl(
            this.templatePath('_index.html'),
            this.destinationPath('src/index.html'),
            {
                appName: this.appName,
                appDescription: this.appDescription
            }
        );

        // Copying static files
        this.copy('_editorconfig', '.editorconfig');
        this.copy('_gitignore', '.gitignore');
        this.copy('_gitattributes', '.gitattributes');
        this.copy('_jshintrc', '.jshintrc');
        this.copy('_bowerrc', '.bowerrc');
        this.copy('_Gruntfile.js', 'Gruntfile.js');
        this.copy('_server.js', 'server.js');
        this.copy('_requireconfig.js', 'requireconfig.js');
        this.copy('_main.js', 'src/scripts/main.js');
        this.copy('_main.css', 'src/styles/main.css');
    },

    install: function(){
        // Run npm install & bower install if requested
        if(this.genInstallDeps){
            this.installDependencies();
        }
        else{
            this.log('\nI\'m all done.\n');
        }
    }
});
