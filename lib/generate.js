const fs = require('fs.extra');
const path = require('path');
//const getSourceDirectory = require('./source');

const generate = function () { };

/**
 * create file with appropiate file type using fs
 * @param {string} re - regular expresssion
 * @param {string} fileName - file name
 * @param {string} ${type} = file type
 */

generate.prototype.createFile = function (re, filetype, fileName) {
	const file = fs.readFileSync(path.join(__dirname, '..', 'templates/js/' + filetype + '/' + filetype + '.js'), 'utf-8');
	const _modFile = file.replace(re, fileName);
	fs.writeFileSync(path.join(process.cwd(), '/js/' + filetype, fileName + '.js'), _modFile, 'utf-8');
}

generate.prototype.generateFile = function (type, module, fileName, cb) {
	try {
		if (fileName !== undefined) {
			const exists = fs.accessSync(path.join(process.cwd(), getSourceDirectory(), 'js/' + filetype, module, fileName), fs.F_OK);
			cb(`${fileName}.js already exists`);
			return;
		}
		else {
			const exists = fs.accessSync(path.join(process.cwd(), getSourceDirectory(), 'js/' + filetype, module + '.js'), fs.F_OK);
			cb(`${fileName}.js already exists`);
			return;
		}
	}
	catch (e) {
		const file = fs.readFileSync(path.join(__dirname, '..', 'templates/js/' + filetype + '/' + fileName + '.js'), 'utf-8');
		const re = /<name>/gi;
		if (fileName !== undefined) {
			try {
				if (answers.propTypes === 'no') {
					fs.mkdirSync(path.join(process.cwd(), getSourceDirectory(), 'js/routes', module), 0755);
					const _modFile = file.replace(re, componentName);
					fs.writeFileSync(path.join(process.cwd(), getSourceDirectory(), 'js/routes', module, componentName + '.react.js'), _modFile, 'utf-8');
					cb(true);
				}
				else {
					fs.mkdirSync(path.join(process.cwd(), getSourceDirectory(), 'js/routes', module), 0755);
					const _modFile = file.replace(re, componentName);
					const __modFile = this.createModFile(_modFile, answersInner, componentName);
					fs.writeFileSync(path.join(process.cwd(), getSourceDirectory(), 'js/routes', module, componentName + '.react.js'), __modFile, 'utf-8');
					cb(true);
				}
			}
			catch (ex) {
				if (ex.syscall == 'open') {
					cb('module doesn\'t exist');
				}
				else {
					const _modFile = file.replace(re, componentName);
					const __modFile = this.createModFile(_modFile, answersInner, componentName);
					fs.writeFileSync(path.join(process.cwd(), getSourceDirectory(), 'js/routes', module, componentName + '.react.js'), __modFile, 'utf-8');
					cb(true);
				}
			}
		}
		else {
			try {
				const _modFile = file.replace(re, module);
				const __modFile = this.createModFile(_modFile, answersInner, module);
				fs.writeFileSync(path.join(process.cwd(), getSourceDirectory(), 'js/routes', module + '.react.js'), __modFile, 'utf-8');
				cb(true);
			}
			catch (ex) {
				cb('error');
			}
		}
	}
}

module.exports = routes;