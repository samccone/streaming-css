var styleElm = document.createElement('style');
var decoder = new TextDecoder();

function parseStream(stream) {
  stream.read().then(function(r) {
    if (!r.done) {
      styleElm.innerHTML += decoder.decode(r.value);
      parseStream(stream);
    }
  });
}

document.body.appendChild(styleElm);

fetch('large.css')
.then(function(res) {
  var stream = res.body.getReader();
  parseStream(stream);
});

