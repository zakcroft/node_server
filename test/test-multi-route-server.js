/**
 * User: zak
 * Date: 16/03/13
 * Time: 07:18
 */
//     var nodeUnit = require('nodeunit');
var server = require("../servers/multi-route-server").server,
//    assert = require('assert'),
    http = require('http'),
    PORT = 8080,
   options = {
       hostname: 'localhost',
       port: PORT,
       method: 'GET'
    };
//
////var request = require("request");
////var fork = require("child_process").fork;


//exports['read'] = nodeUnit.testCase({
//
//    setup: function(done) {
//        server.listen(PORT);
//        options.path = null;
//        done()
//
//    },
//
//    teardown: function(done) {
//        server.close();
//        done();
//    }
//
//
//})

module.exports = {

    setUp: function (done) {
        server.on('listening',function(){
            console.log('ok, server is running \n');
        });
        server.on('close',function(){
            console.log('ended event fired \n');
        });


        server.listen(PORT);
        options.path = null;
        done()
    },
    tearDown: function (done) {

        server.close(function(){
            console.log('close')
        });

        done();
    },

    'testRoot' : function(test) {

        options.path = '/';

       var req = http.request(options, function (res) {
//          console.log('STATUS: ' + response.statusCode +" \n");
//          test.equal(response.url, '', 'first test message');
//          test.done();
           console.log('STATUS: ' + res.statusCode);
           console.log('HEADERS: ' + JSON.stringify(res.headers));
           res.setEncoding('utf8');
//           res.on('data', function (chunk) {
//               console.log('BODY: ' + chunk);
//           });
           req.write('data\n');
           test.done();
       });

        req.end();
    }
};





