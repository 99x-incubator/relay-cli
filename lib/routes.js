const fs = require('fs.extra');
const path = require('path');
const getSourceDirectory = require('./source');

const routes = function () { };

/**
 * create route file with fs
 * @param {string} re - regular expresssion
 * @param {string} routeName - route name
 * @param {string} answersInner - options provided when creating the route
 */

generate.prototype.createRouteFile = function (re, routeName, answersInner) {
    const _modFile = file.replace(re, routeName);
    const __modFile = this.createModFile(_modFile, answersInner, routeName);
    console.log(__modFile);
    fs.writeFileSync(path.join(process.cwd(), 'src/js/routes', module, routeName + '.js'), __modFile, 'utf-8');
}

generate.prototype.generateroute = function (type, module, routeName, answers, answersInner, cb) {
    try {
        if (routeName !== undefined) {
            const exists = fs.accessSync(path.join(process.cwd(), getSourceDirectory(), 'routes', module, routeName), fs.F_OK);
            cb(`${routeName}.js already exists`);
            return;
        }
        else {
            const exists = fs.accessSync(path.join(process.cwd(), getSourceDirectory(), 'routes', module + '.js'), fs.F_OK);
            cb(`${routeName}js already exists`);
            return;
        }
    }
    catch (e) {
        const file = fs.readFileSync(path.join(__dirname, '..', `templates/js/routes/${type}-route.js`), 'utf-8');
        const re = /'AppHomeRoute'/gi;
        if (routeName !== undefined) {
            try {
                if (answers.propTypes === 'no') {
                    fs.mkdirSync(path.join(process.cwd(), getSourceDirectory(), 'routes', module), 0755);
                    const _modFile = file.replace(re, routeName);
                    fs.writeFileSync(path.join(process.cwd(), getSourceDirectory(), 'routes', module, routeName + '.react.js'), _modFile, 'utf-8');
                    cb(true);
                }
                else {
                    fs.mkdirSync(path.join(process.cwd(), getSourceDirectory(), 'routes', module), 0755);
                    const _modFile = file.replace(re, routeName);
                    const __modFile = this.createModFile(_modFile, answersInner, routeName);
                    fs.writeFileSync(path.join(process.cwd(), getSourceDirectory(), 'routes', module, routeName + '.react.js'), __modFile, 'utf-8');
                    cb(true);
                }
            }
            catch (ex) {
                if (ex.syscall == 'open') {
                    cb('module doesn\'t exist');
                }
                else {
                    const _modFile = file.replace(re, routeName);
                    const __modFile = this.createModFile(_modFile, answersInner, routeName);
                    fs.writeFileSync(path.join(process.cwd(), getSourceDirectory(), 'routes', module, routeName + '.react.js'), __modFile, 'utf-8');
                    cb(true);
                }
            }
        }
        else {
            try {
                const _modFile = file.replace(re, module);
                const __modFile = this.createModFile(_modFile, answersInner, module);
                fs.writeFileSync(path.join(process.cwd(), getSourceDirectory(), 'routes', module + '.react.js'), __modFile, 'utf-8');
                cb(true);
            }
            catch (ex) {
                cb('error');
            }
        }
    }
}

module.exports = generate;