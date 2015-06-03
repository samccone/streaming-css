var fs = require('fs');

var writeStream = fs.createWriteStream('large.css');
var pageWriteStream = fs.createWriteStream('large.html');
var slowWriteStream = fs.createWriteStream('slow-large.html');

writeStream.write('div{width:5px;height:5px;float:left;overflow:hidden;}');
pageWriteStream.write('<html><body><script src="css-stream.js"></script>');
slowWriteStream.write('<html><body><link rel="stylesheet" href="large.css">');

for (var i = 0; i < 0xFFFFFF; i += 1000) {
  var padding = '00000';
  var hex = i.toString(16);

  hex += padding.slice(hex.length - 1);

  writeStream.write('div.a' + i + '{ background: #' + hex + ';}\n');
  pageWriteStream.write('<div class="a' + i + '">' + hex + '</div>');
  slowWriteStream.write('<div class="a' + i + '">' + hex + '</div>');
}

pageWriteStream.end('</body></html>');
slowWriteStream.end('</body></html>');
writeStream.end();
