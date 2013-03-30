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

    setup: function(done) {
        server.listen(PORT);
        options.path = null;
        done()

    },

    'testRoot' : function(test) {
        server.listen(PORT);

        options.path = '/';

       http.request(options, function (response) {
          console.log('STATUS: ' + response.statusCode +" \n");

           response.on('end', function () {
              console.log('end res');
          });

          test.equal(response.url, '', 'first test message');
          test.done();



       }).end();


        server.on('listening',function(){
            console.log('ok, server is running \n');

        });

        server.on('close',function(){
            console.log('ended event fired \n');
        });


    }
};





