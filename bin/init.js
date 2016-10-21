#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const initApp = require('../lib/initialize');
const packageVersion = require('../package.json').version;
const ora = require('ora');

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

/**
 * parse commander object
 */

program.parse(process.argv);

