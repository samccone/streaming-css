var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function(req, res) {
  var filePath = path.join(__dirname, req.url);

  if (fs.existsSync(filePath)) {
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.end('unknown');
  }
});

server.listen(8000);
