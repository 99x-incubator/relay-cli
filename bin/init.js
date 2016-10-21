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
  .description('initialize React project')
  .option("-l, --eslint", "eslint required or not ?")
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
  .command('generate container [containerName]')
  .alias('g')
  .description('create relay container')
  // .option("-l, --eslint", "eslint required or not ?")
  .action(function(containerName) {
    if (containerName === undefined) {
      console.log('provide a project name');
      return;
    }
    else
		{
			container = new containerApp();
			const spinner = ora(`generating container ${containerName}`).start();
      container.createContainer(containerName,function(status){
        
      })
		}
  }).on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ react-cli init awesomereact');
    console.log('    $ react-cli init -l awesomereact');
    console.log();
  });
/**
 * parse commander object
 */

program.parse(process.argv);

