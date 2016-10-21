const fs = require('fs.extra');
const path = require('path');

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

module.exports = generate;