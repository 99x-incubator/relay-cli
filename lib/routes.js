const fs = require('fs.extra');
const path = require('path');
//const getSourceDirectory = require('./source');

const routes = function () { };

/**
 * create route file with fs
 * @param {string} re - regular expresssion
 * @param {string} routeName - route name
 */

routes.prototype.createRouteFile = function (routeName) {
    console.log("method" + routeName);
    const file = fs.readFileSync(path.join(__dirname, '..', `templates/js/routes/AppHomeRoute.js`), 'utf-8');
    const _modFile = file.replace(routeName);
    fs.writeFileSync(path.join(process.cwd(), '/js/routes', routeName + '.js'), _modFile, 'utf-8');
}

module.exports = routes;