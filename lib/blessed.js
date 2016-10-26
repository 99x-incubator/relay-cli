const blessed = require('blessed')
const contrib = require('blessed-contrib')
const dirTree = require('directory-tree');
const getSourceDirectory = require('./source');
const screen = blessed.screen();

/**
 * view directory stcuture facade
 * @param {string} component - component name
 * @param {string} test - test file
 * @param {function} cb - callback for status return
 */

const blessDraw = function () { };


blessDraw.prototype.viewDirectoryStructure = function (type) {
    const src = getSourceDirectory();
    console.log(src);
    const treeComponents = dirTree(`${src}/${type}`);



    // let outerArray = [];
    // //    console.log(treeComponents.children)
    // treeComponents.children.map((file) => {
    //     let innerArray = [];
    //     for (let idx in file) {
    //         innerArray.push(file[idx]);
    //     }
    //     outerArray.push(innerArray);
    // });


    this.blessing(treeComponents);
    // if (component) {
    //     const treeComponents = dirTree(`${src}/components`);
    //     renderView(treeComponents);
    //     cb(true);
    // }
    // if (test) {
    //     const treeTests = dirTree(`${src}/__tests__`);
    //     renderView(treeTests);
    //     cb(true);
    // }
}

blessDraw.prototype.blessing = function (treeComponents) {
    var grid = new contrib.grid({ rows: 1, cols: 1, screen: screen })

    var table = grid.set(0, 0, 1, 1, contrib.table,
        {
            keys: true
            , fg: 'white'
            , selectedFg: 'white'
            , selectedBg: 'blue'
            , interactive: true
            , label: 'File Information'
            , width: '30%'
            , height: '30%'
            , border: { type: "line", fg: "cyan" }
            , columnSpacing: 0 //in chars 
            , columnWidth: [60, 30, 10, 10] /*in chars*/

        })

    //allow control the table with the keyboard 
    table.focus()

    let outerArray = [];
    //    console.log(treeComponents.children)
    treeComponents.children.map((file) => {
        let innerArray = [];
        for (let idx in file) {
            innerArray.push(file[idx]);
        }
        outerArray.push(innerArray);
    });


    console.log(outerArray);
    table.setData(
        {
            headers: ['Path', 'Name', 'Size', 'Extension']
            , data:
            outerArray
        })

    screen.key(['escape', 'q', 'C-c'], function (ch, key) {
        return process.exit(0);
    });

    screen.render()
}

module.exports = blessDraw;
