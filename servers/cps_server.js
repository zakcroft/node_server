
var sys = require('sys');
var http = require('http');
var url = require('url');
var fs = require('fs');

var DocRoot = "./www/";

// Create the web server with a handler callback:
var httpd = http.createServer(function (req, res) {
    sys.puts(" request: " + req.url);

    // Parse the url:
    var u = url.parse(req.url, true);
    var path = u.pathname.split("/");

    // Strip out .. in the path:
    var localPath = u.pathname;
    //  "<dir>/.." => ""
    var localPath =
        localPath.replace(/[^/]+\/+[.][.]/g, "");
    //  ".." => "."
    var localPath = DocRoot +
        localPath.replace(/[.][.]/g, ".");

    sys.puts(" local path: " + localPath);

    // Read in the requested file, and send it back.
    // Note: readFile takes the current continuation:
    fs.readFile(localPath, function (err, data) {
        var headers = {};

        if (err) {
            headers["Content-Type"] = "text/plain";
            res.writeHead(404, headers);
            res.write("404 File Not Found\n");
            res.end();
        } else {
            var mimetype = MIMEType(u.pathname);

            // If we can't find a content type,
            // let the client guess.
            if (mimetype)
                headers["Content-Type"] = mimetype;

            res.writeHead(200, headers);
            res.write(data);
            res.end();
        }
    });
});

// Map extensions to MIME Types:
var MIMETypes = {
    "html": "text/html",
    "js": "text/javascript",
    "css": "text/css",
    "txt": "text/plain"
};

function MIMEType(filename) {
    var parsed = filename.match(/[.](.*)$/);
    if (!parsed)
        return false;
    var ext = parsed[1];
    return MIMEType[ext];
}

// Start the server, listening to port 8000:
httpd.listen(8000);