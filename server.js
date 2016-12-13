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

app.listen(process.env.PORT || port, function() {
  console.log("listening on 8080!");
});
