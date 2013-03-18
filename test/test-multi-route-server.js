/**
 * User: zak
 * Date: 16/03/13
 * Time: 07:18
 */

var server = require("../servers/multi-route-server").server,
    assert = require('assert'),
    http = require('http'),
    PORT = 8080,
    options = {
        hostname: 'localhost',
        port: PORT,
        method: 'GET'
    };

//var request = require("request");
//var fork = require("child_process").fork;

module.exports = {

    setup: function (done) {
        options.path = null;

    },

    teardown: function () {
        //server.close();
    },


    testRoot: function (test) {
        server.listen(PORT);
        options.path = '/';
        http.request(options, function (res) {
            assert.equal('root url', res);
        });
    },

    testMultiRoute: function (test) {
        test.ok(false, "this assertion should fail");
        test.done();
    },

    testFunctionReturnedFromRoute: function (test) {
        test.ok(false, "this assertion should fail");
        test.done();
    }

}


