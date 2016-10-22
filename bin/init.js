#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const initApp = require('../lib/initialize');
const packageVersion = require('../package.json').version;
const ora = require('ora');
const containerApp = require('../lib/container');

/**
 * set commander version
 */
program
	.version(packageVersion);

/**
 * initialize project
 */
program
  .command('init [projectname]')
  .alias('i')
  .description('initialize Relay.js project')
  .action(function(projectname, options) {
    if (projectname === undefined) {
      console.log('provide a project name');
      return;
    }
    else
		{
			init = new initApp();
			const spinner = ora('creating directory structure').start();
			init.init(projectname, function(response) {
				if(response) {
					spinner.text = 'application created successfully';
					spinner.succeed();
					console.log(`\t$ cd ${projectname}\n \t$ npm install \n \tHappy hacking ♥`);
				} else {
					spinner.text = 'something went wrong !';
					spinner.fail();
				}
			});
		}
  }).on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ react-cli init awesomereact');
    console.log('    $ react-cli init -l awesomereact');
    console.log();
  });



  program
  .command('generate [type] [module] [name]')
  .alias('g')
  .description('generate relay container')
  .action(function(type,module,name) {
    type+='s';
    if (module === undefined) {
      console.log('provide a container name');
      return;
    }
    else
		{
      container = new containerApp()
      const spinner = ora(`creating ${type} ${name}`).start();
      container.createContainer(type,module,function(result){
        if(result) {
          spinner.text = `Container ${module} created`
          spinner.succeed();

        } else {
          spinner.text = `Container ${module} already exists`
          spinner.fail();
        }
      },name)
		}
  }).on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ relay init awesomereact');
    console.log('    $ react-cli init -l awesomereact');
    console.log();
  }); 

   program
  .command('view')
  .alias('v')
  .option('-cn','--containers')
  .description('view relay containers')
  .action(function() {
    type+='s';
    if (module === undefined) {
      console.log('provide a container name');
      return;
    }
    else
		{
      container = new containerApp()
      const spinner = ora(`Creating Container ${name}`).start();
      container.createContainer(type,module,function(result){
        if(result) {
          spinner.text = `Container ${module} created successfully`
          spinner.succeed();

        }  
      },name)
		}
  }).on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ relay init awesomereact');
    console.log('    $ react-cli init -l awesomereact');
    console.log();
  }); 

/**
 * parse commander object
 */

program.parse(process.argv);

