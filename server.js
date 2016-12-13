var http = require('http')
  , fs   = require('fs')
  , url  = require('url')
  , Yelp = require('yelpv3')
  , port = 8080;

var async = require("async");
var Promise = require('promise');

var yelp = new Yelp({
  app_id: "OVW6i4q-Pn01w3btb-7Aaw",
  app_secret: "2Z111pczUu6xlQCV3g3aEfr9XVPoeCiy239jjmyASb1bzRqA1KhCfKU4dni5S86g"
});

var output;
var businessInfo;

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
    //main page to test comparing components
    case '/test.html':
      sendFile(res, 'test.html')
      break 
    //search basic information from yelp API
    case '/search':
      search(req, res)
      break
    //get further information by business id
    case '/getInfo':
      getInfo(req, res)
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

function search(req, res){
    yelp.search({term:'food', location:'Carlifornia', limit: 10})
        .then(function (data) { 
            //console.log(data);
            var output = JSON.parse(data);
            //console.log(output);
            console.log(output.total)
            res.end(JSON.stringify(output))
        })
        .catch(function (err) { console.error(err);});
}


function getSingleBus(id){
    return new Promise(function(resolve, reject){
        yelp.business(id).then(function(data){
                temp = JSON.parse(data);
                resolve(temp)
            })
         .catch(function (err){
            console.error(err);
            reject(err)})
    })
}

function getInfo(req, res){
    var chunk = ""
    req.on('data', function(data) {
        chunk += data;
    })
    req.on('end', function(data) {
        console.log(chunk)
        var obj = chunk.split(",")
        var busInfoPromise = obj.map(getSingleBus)
        Promise.all(busInfoPromise).then(function(businfo){
            console.log(businfo)
            res.end(JSON.stringify(businfo))
        }).catch(function(businfo){
            console.log("Error Occurs")
        })
    }) 
}

