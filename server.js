var http = require('http')
  , fs   = require('fs')
  , url  = require('url')
  , Yelp = require('yelpv3')
  , port = 8080;

var yelp = new Yelp({
  app_id: "OVW6i4q-Pn01w3btb-7Aaw",
  app_secret: "2Z111pczUu6xlQCV3g3aEfr9XVPoeCiy239jjmyASb1bzRqA1KhCfKU4dni5S86g"
});


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
      sendFile(res, 'json/categories.json')
      break
    case '/zoomableTM.html':
      sendFile(res, 'zoomableTM.html')
      break
    case '/bus_cat.json':
      sendFile(res, 'json/bus_cat.json')
      break
    case '/test.html':
      sendFile(res, 'test.html')
      break 
    case '/table.html':
      res.end(JSON.stringify(table))
      break;
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



