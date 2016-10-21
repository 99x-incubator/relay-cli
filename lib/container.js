'use strict'

const fs = require('fs.extra');
const path = require('path');
const generate = function() {};

generate.prototype.createContainer = function(name){
    try{
        const containerExists = fs.accessSync(path.join(process.cwd(),'/js','/components'),fs.F_OK)
        console.log("nice");
    }catch(e){
        console.log(process.cwd());
    }
	//fs.writeFileSync(path.join(process.cwd(), 'src/components', module, componentName + '.react.js'), __modFile, 'utf-8');
}

module.exports = generate;