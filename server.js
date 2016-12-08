var http = require('http')
  , fs   = require('fs')
  , url  = require('url')
  , port = 8080;

var server = http.createServer (function (req, res) {
  var uri = url.parse(req.url)

  switch( uri.pathname ) {
    case '/':
      sendFile(res, 'index.html')
      break
    case '/index.html':
      sendFile(res, 'index.html')
      break
    case '/treemap.html':
      sendFile(res, 'treemap.html')
      break
    case '/categories.json':
      sendFile(res, 'categories.json')
      break
    case '/zoomableTM.html':
      sendFile(res, 'zoomableTM.html')
      break
    case '/test.json':
      sendFile(res, 'test.json')
      break
     
    default:
      res.end('404 not found')
  }
})

server.listen(process.env.PORT || port);
console.log('listening on 8080')


function sendFile(res, filename, contentType) {
  contentType = contentType || 'text/html'
  fs.readFile(filename, function(error, content) {
    res.writeHead(200, {'Content-type': contentType})
    res.end(content, 'utf-8')
  })

}
