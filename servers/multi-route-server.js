/**
 * Created with JetBrains WebStorm.
 * User: zak
 * Date: 04/03/13
 * Time: 16:47
 * To change this template use File | Settings | File Templates.
 */


var http = require('http');
var path = require('path');
var url = require('url');


var pages = [
    {route: '/', output: 'Woohoo!'},
    {route: '/about/this', output: 'Multilevel routing with Node example'},
    {route: '/about/node', output: 'Evented I/O for V8 JavaScript.'},
    {route: '/another page', output: function () {
        return 'Here\'s ' + this.route;
    }}
];


http.createServer(function (req, res) {

    var parsedUrl = url.parse(decodeURI(req.url), true);
    //var pathArr = parseUrl.pathname.split('/').splice(1);

    pages.forEach(function (page) {
        if (page.route === parsedUrl.pathname) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(typeof page.output === 'function' ? page.output() : page.output);
        }

    });

    if (res.finish) {
        res.writeHead(404);
        res.end('Page Not Found');
    }

}).listen(8080);



