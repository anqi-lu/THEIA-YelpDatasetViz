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
app.use(express.static('top_checkin_bus'));

// respond to a post request
app.post('/', function (req, res) {
  //parse the request
  res.send('Got a POST request')
});

app.post('/search', function(req, res){
  search(req, res);
})

app.post('/getReview', function(req, res){
  getInfo(req, res);
})

app.post('/advanceSearch', function(req, res){
  advanceSearch(req, res);
})

app.get('/test', function(req, res){
  test();
})

app.listen(process.env.PORT || port, function() {
  console.log("listening on 8080!");
});

//function to handle requests from table.html
function search(req, res){
    var chunk = ""
    req.on('data', function(data) {
        chunk += data;
    })
    req.on('end', function(data) {
        console.log(chunk)
        console.log(chunk.length)
        yelp.search({location:chunk, limit:20})
            .then(function (data) { 
                //console.log(data);
                var output = JSON.parse(data);
                //console.log(output);
                //console.log(output.total)

            res.end(JSON.stringify(output))
        })
        .catch(function (err) { console.error(err);});
    })
}

function advanceSearch(req, res){
    var chunk = ""
    req.on('data', function(data) {
        chunk += data;
    })
    req.on('end', function(data) {
        var obj = chunk.split("/")
        console.log(chunk)
        console.log(obj)
        var loc = obj[0]
        var term = obj[1]
        var price = obj[2]
        var sort = obj[3]
        var dic = {}
        dic['limit']=20
        if(loc.length>0){
            dic['location']=loc
        }else{
            dic['location']='Worcester'
        }
        
        if(term.length>0){
            dic['term']=term;
        }
        
        if(price.length>0){
            dic['price']=price;
        }
        
        if(price.length>0){
            dic['sort_by']=sort;
        }
        
        yelp.search(dic)
            .then(function (data) { 
                //console.log(data);
                var output = JSON.parse(data);
                //console.log(output);
                //console.log(output.total)
            res.end(JSON.stringify(output))
        })
        .catch(function (err) { console.error(err);});
    })
}




function getInfo(req, res){
    var chunk = ""
    req.on('data', function(data) {
        chunk += data;
    })
    req.on('end', function(data) {
        var obj = chunk.split(",")
        //console.log(obj)
        var busInfoPromise = obj.map(getSingleBus)
        Promise.all(busInfoPromise).then(function(businfo){
            //console.log(businfo)
            res.end(JSON.stringify(businfo))
        }).catch(function(businfo){
            console.log("Error Occurs")
        })
    })
}


function getSingleBus(id){
    return new Promise(function(resolve, reject){
        yelp.business(id).then(function(data){
            var bus = JSON.parse(data);
            yelp.reviews(id).then(function(review){
                var temp = JSON.parse(review);
                var array = {}
                array['review'] = temp
                array['business'] = bus
                resolve(array)
            })
            .catch(function (err){
                console.error(err);
                reject(err)})
        })
         .catch(function (err){
            console.error(err);
            reject(err)})
    })
}




