var http = require('http')
  , fs   = require('fs')
  , url  = require('url')
  , port = 8080;

var server = http.createServer (function (req, res) {
  var uri = url.parse(req.url)

  switch( uri.pathname ) {
    case '/':
<<<<<<< HEAD
      sendFile(res, 'index.html')
      break
    case '/index.html':
      sendFile(res, 'index.html')
=======
      sendFile(res, 'proposal.txt', 'text')
      break
    case '/index.html':
      sendFile(res, 'proposal.txt', 'text')
>>>>>>> 1538e72fc23844479cc0cacbd0f716ea5184f397
      break
    default:
      res.end('404 not found')
  }
})

server.listen(process.env.PORT || port);
console.log('listening on 8080')

// subroutines

<<<<<<< HEAD
function sendFile(res, filename) {

  fs.readFile(filename, function(error, content) {
    res.writeHead(200, {'Content-type': 'text/html'})
=======
function sendFile(res, filename, contentType) {
  contentType = contentType || 'text/html'
  fs.readFile(filename, function(error, content) {
    res.writeHead(200, {'Content-type': contentType})
>>>>>>> 1538e72fc23844479cc0cacbd0f716ea5184f397
    res.end(content, 'utf-8')
  })

}
