const fs = require('fs.extra');
const path = require('path');
const initialize = function() {};

initialize.prototype.init = function(projectName, cb) {
	console.log('here');
	let projectPath = projectName;
	console.log(projectPath);
	fs.mkdirp(projectPath, (error) => {
		this.copyCommonTemplates(projectName)
			.then((result) => {
				cb(true);
				console.log(result);
			})
			.catch((error) => {
				console.log(error);
			});
	});
}

/**
 * copy common templates recursively
 * @param {string} projectName - project name
 */

initialize.prototype.copyCommonTemplates = function(projectName) {
	return new Promise(function(resolve, reject) {
		fs.copyRecursive(path.join(__dirname, '..', 'templates'), path.join(projectName), function (err) {
		  if (err) {
		  	console.log(err);
		  	reject(err);
		  }
		  else {
		  	resolve(true);
		  }
		});
	});
}

module.exports = initialize;