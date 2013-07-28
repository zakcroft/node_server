
var http = require('http');
var path = require('path');
var url = require('url');


var pages = [
    {route: '/', output: 'root url'},
    {route: '/about/this', output: 'Multilevel routing with Node example'},
    {route: '/about/node', output: 'Evented I/O for V8 JavaScript.'},
    {route: '/another page', output: function () {
        return 'Here\'s ' + this.route;
    }}
]

var server = http.createServer(function (req, res) {
    var parsedUrl = url.parse(decodeURI(req.url), true);
    var pageData = "";
    var reqData

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

    req.on('data', function (chunk) {
       reqData += chunk;
    });

    pages.forEach(function (page) {
        if (page.route === parsedUrl.pathname) {
            res.writeHead(200, {'Content-Type': 'text/html'});

            res.on('data', function (chunk) {
                pageData += chunk;
            });

            res.on('end', function (chunk) {
               console.log(pageData);
            });

            res.end(typeof page.output === 'function' ? page.output() : page.output);
        }

    })

    if (res.finish) {
        res.writeHead(404);
        res.end('Page Not Found');
    }



});

exports.server = server;

server.listen(8080);

console.log(' multi server running at 8080 \n');




