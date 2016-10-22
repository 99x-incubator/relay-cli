'use strict'

const blessed = require('blessed');

let view = function() {};

view.prototype.generateView = function(type) {
    let screen = blessed.screen({
        smartCSR : true
    });
}


module.exports = view;