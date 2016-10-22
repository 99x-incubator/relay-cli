var blessed = require('blessed')
var contrib = require('blessed-contrib')
var screen = blessed.screen();

const blessDraw = function () { };

blessDraw.prototype.blessing = function () {

    var map = contrib.map({ label: 'World Map' })
    map.addMarker({ "lon": "-79.0000", "lat": "37.5000", color: "red", char: "X" })

    screen.render()
}

module.exports = blessDraw;
