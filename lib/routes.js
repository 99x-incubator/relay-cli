const fs = require('fs.extra');
const path = require('path');
//const getSourceDirectory = require('./source');

const routes = function () { };

/**
 * create route file with fs
 * @param {string} re - regular expresssion
 * @param {string} routeName - route name
 */

routes.prototype.createRouteFile = function (re, routeName) {
    const file = fs.readFileSync(path.join(__dirname, '..', 'templates/js/routes/AppHomeRoute.js'), 'utf-8');
    const _modFile = file.replace(re, routeName);
    fs.writeFileSync(path.join(process.cwd(), '/js/routes', routeName + '.js'), _modFile, 'utf-8');
}

/**
 * 
 */

routes.prototype.createRouteFile = function (re, routeName, module) {
    const file = fs.readFileSync(path.join(__dirname, '..', 'templates/js/routes/AppHomeRoute.js'), 'utf-8');
    const _modFile = file.replace(re, routeName);
    fs.writeFileSync(path.join(process.cwd(), '/js/routes' + module, routeName + '.js'), _modFile, 'utf-8');
}

/**
 * 
 */

routes.prototype.generateRouteFile = function (routeName, module, cb) {
    try {
        if (routeName !== undefined) {
            const exists = fs.accessSync(path.join(process.cwd(), getSourceDirectory(), 'js/route', module, routeName), fs.F_OK);
            cb(routeName + '.js  already exists');
            return;
        }
        else {
            const exists = fs.accessSync(path.join(process.cwd(), getSourceDirectory(), 'js/route', module + '.js'), fs.F_OK);
            cb(routeName + '.js  already exists');
            return;
        }
    } catch (e) {
        const re = /<name>/gi;
        try {
            fs.mkdirSync(path.join(process.cwd(), getSourceDirectory(), 'js/routes', module), 0755);
            createRouteFile(re, routeName);
        } catch (e) {
            createRouteFile(re, routeName, module);
        }
    }
}

module.exports = routes;