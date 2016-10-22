#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const initApp = require('../lib/initialize');
const routeApp = require('../lib/routes');
const generateApp = require('../lib/generate');
const checkDuplicates = require('../lib/utils/checkduplicates');
const packageVersion = require('../package.json').version;
const ora = require('ora');
const containerApp = require('../lib/container');
const blessedApp = require('../lib/blessed');

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
  .action(function (projectname, options) {
    if (projectname === undefined) {
      console.log('provide a project name');
      return;
    }
    else {
      init = new initApp();
      const spinner = ora('creating directory structure').start();
      init.init(projectname, function (response) {
        if (response) {
          spinner.text = 'application created successfully';
          spinner.succeed();
          console.log(`\t$ cd ${projectname}\n \t$ npm install \n \tHappy hacking ♥`);
        } else {
          spinner.text = 'something went wrong !';
          spinner.fail();
        }
      });
    }
  }).on('--help', function () {
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
    type +='s';
    if (type === undefined) {
      console.log('provide a container name');
      return;
    }
    if(type === 'components') {
    		let choices = [];

    		let numberOfPropTypes = 0;

    		let inputPropTypeName = {
			    type: 'input',
			    name: 'propName',
			    message: 'Prop name',
			    paginated: true,
			    validate: function(input) {
			    	let regex = /[^a-z\d]/i;
			    	return false;
			    	return (regex.test(input));
			    },
			    when: function(answer) {
			    	return answer.propTypes === 'yes'
			    }
			  };

    		choices.push({
				  name: 'child',
				  value: 'child',
				  short: 'child'
				});

				choices.push({
				  name: 'parent',
				  value: 'parent',
				  short: 'parent'
				});
				
				inquirer.prompt([
				  {
				    type: 'list',
				    name: 'componentType',
				    message: 'Select component type',
				    paginated: true,
				    choices: choices
				  },
				  {
				    type: 'list',
				    name: 'propTypes',
				    message: 'Add propTypes',
				    paginated: true,
				    choices: ['yes', 'no']
				  },
				  {
				    type: 'input',
				    name: 'propNo',
				    message: 'Number of prop types',
				    paginated: true,
				    validate: function(input) {
				    	let regex = /^\d+$/;
				    	//return false;
				    	if(!regex.test(input)) {
				    		return 'enter a number';
				    	}
				    	return true;
				    },
				    when: function(answer) {
				    	return answer.propTypes === 'yes'
				    }
				  },
				  {
				    type: 'input',
				    name: 'propNames',
				    message: 'Prop names',
				    paginated: true,
				    when: function(answer) {
				    	numberOfPropTypes = answer.propNo;
				    	return answer.propTypes === 'yes'
				    },
				    validate: function(input) {
				    	let propNames = input.split(' ');
				    	if(propNames.length !== Number(numberOfPropTypes)) {
				    		return `enter ${numberOfPropTypes} prop names`;
				    	}
				    	let regex = /^[a-zA-Z]+$/;
				    	
				    	if(!checkDuplicates(propNames)) {
				    		return 'duplicate prop names';
				    	}
				    	// if(!regex.test(input)) {
				    	// 	return 'enter valid name [alpha]'
				    	// }
				    	return true;
				    }
				  }
				]).then(function (answers) {
					generate = new generateApp();
					if(answers.propTypes === 'no') {
						generate.createComponent(module, name, answers, null, function(status) {
							if(status) {
								const spinner = ora('loading directory structure \n').start();
								spinner.text = 'component created successfully';
								spinner.succeed();
							}
						});
					}
					else {
						let opts = [];
						let propNames = answers.propNames.split(' ');

						for(let count=0; count<numberOfPropTypes; count++) {
							let propTypeChoice = {
								type: 'list',
								name: `${propNames[count]}`,
								message: `Select prop type for ${propNames[count]}`,
								paginated: true,
								choices: ['number', 'string', 'bool', 'object', 'array', 'func', 'symbol'],
							};
							opts.push(propTypeChoice);
						}
						inquirer.prompt(opts)
							.then(function(answersInner) {
								generate.createComponent(module, name, answers, answersInner, function(status) {
									if(status) {
										const spinner = ora('loading directory structure \n').start();
										spinner.text = 'component created successfully';
										spinner.succeed();
									}
								});
							});
					}
				});
		}
    else if(type === 'containers') {
      container = new containerApp()
       const spinner = ora(`creating ${type} ${name}`).start();
      container.createContainer(type,module,function(result){
        if(result) {
          spinner.text = `${type} ${module} created`
          spinner.succeed();

        }  
      },name)
		} 
		else if(type === 'routes') {
			const route = new routeApp();
      const spinner = ora(`creating ${type} ${name}`).start();
      route.createRouteFile(type, module, function (status) {
        if (status) {
          spinner.text = `${type} ${module} created`
          spinner.succeed();
        }
      }, name);
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

/**
 * command generating route file
 */
/**
* View commands
*/
program
	.command('view')
	.alias('v')
	.option('-r, --route', 'view routes only')
  .option('-d,--container','view containers only')
  .option('-c,--component','view components only')
	.action(function (options) {
    blessed = new blessedApp()
		if (options.component) {
			blessed.viewDirectoryStructure('components');
		} else if(options.container) {
      blessed.viewDirectoryStructure('containers');
    } else if(options.route) {
      blessed.viewDirectoryStructure('routes');
    }else{
      //view all
    }
	});

program.parse(process.argv);