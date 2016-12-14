var http = require('http')
  , fs   = require('fs')
  , url  = require('url')
  , Yelp = require('yelpv3')
  , express = require('express')
  , port = 8080;

var app = express();
var bodyParser = require('body-parser')

//app.use(express.bodyParser());
var yelp = new Yelp({
  app_id: "OVW6i4q-Pn01w3btb-7Aaw",
  app_secret: "2Z111pczUu6xlQCV3g3aEfr9XVPoeCiy239jjmyASb1bzRqA1KhCfKU4dni5S86g"
});


// get all the files in public and json folder
app.use(express.static('public'));
app.use(express.static('json'));

// respond to a post request
app.post('/', function (req, res) {
  //parse the request
  res.send('Got a POST request')
});

app.post('/search', function(req, res){
  search(req, res);
})

app.post('/getInfo', function(req, res){
  getInfo(req, res);
})

app.listen(process.env.PORT || port, function() {
  console.log("listening on 8080!");
});

//function to handle requests from table.html
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
        //console.log(chunk)
        var obj = chunk.split(",")
        var busInfoPromise = obj.map(getSingleBus)
        Promise.all(busInfoPromise).then(function(businfo){
            //console.log(businfo)
            res.end(JSON.stringify(businfo))
        }).catch(function(businfo){
            console.log("Error Occurs")
        })
    }) 
}


