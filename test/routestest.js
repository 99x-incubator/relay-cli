const assert = require('chai').assert;
const routeApp = require('../lib/routes');

generate = new routeApp();

describe('Create test routes', function () {
    it('should create a route', function (done) {
        generate.createComponent('core', 'sample', answers, answersInner, function (status) {
            assert.equal(status, 'module doesn\'t exist');
            done();
        });
    });
});
