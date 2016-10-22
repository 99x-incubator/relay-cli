const fs = require('fs.extra');
const path = require('path');
//const getSourceDirectory = require('./source');

const routes = function () { };

/**
 * create route file with fs
 * @param {string} re - regular expresssion
 * @param {string} routeName - route name
 */


routes.prototype.createRouteFile = function (type, module, callback, name) {
    let dir = null;
    try {
        //check if component is created
        if (name === undefined) {
            dir = `${type}/${module}.js`;
        } else {
            dir = `${type}/${module}/${name}.js`;
        }

        const containerExists = fs.accessSync(path.join(process.cwd(), 'js', dir), fs.F_OK);
        callback(false);
    } catch (e) {
        const file = fs.readFileSync(path.join(__dirname, '..', `templates/js/${type}/AppHomeRoute.js`), 'utf-8');
        const re = /<name>/gi;
        let _modFile = null;

        if (name === undefined) {
            _modFile = file.replace(re, module);
        }
        else {
            _modFile = file.replace(re, name);
        }

        if (name !== undefined) {
            try {
                fs.mkdirSync(path.join(process.cwd(), 'js', `${type}`, `${module}`));
                fs.writeFileSync(path.join(process.cwd(), 'js', dir), _modFile, 'utf-8');
                callback(true);
            } catch (e) {
                fs.writeFileSync(path.join(process.cwd(), 'js', dir), _modFile, 'utf-8');
                callback(true);
            }
        } else {
            try {
                fs.writeFileSync(path.join(process.cwd(), 'js', dir), _modFile, 'utf-8');
                callback(true);
            } catch (e) {
                console.log(e);
            }
        }
    }
}

module.exports = routes;