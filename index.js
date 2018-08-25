// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var request = require('request');
var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');
var leagueAPI = require('leagueapi');
var mysql = require('mysql');
// riot.developerKey = "RGAPI-68212aa1-b941-4343-9cfd-88b7180525c1";
var riotDevKey = "RGAPI-2cff7769-a406-4a4f-a764-34c5e2e37239";
// const riotDevKey = LeagueJS(process.env)

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}


var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://heroku_7slxnwl0:37hrgiv0lnilfh7mobs5oq08pd@ds135441.mlab.com:35441/heroku_7slxnwl0',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || '', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',  // Don't forget to change to https if needed
  liveQuery: {
    classNames: ["Posts", "Comments", "champions"] // List of classes to support for query subscriptions
  }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey


// con.connect(function(err) {
  // if (err) throw err;
  // console.log("connected bb");
  // var sql = "INSERT INTO champions () VALUES"
// })
var app = express();
leagueAPI.init(riotDevKey);
leagueAPI.setRateLimit(200, 500);

// var con = mysql.createConnection({
//   host: "us-cdbr-iron-east-01.cleardb.net",
//   user: "b52246f2fbaf21",
//   password: "c0717918" ,
//   database: "heroku_f18a66d54326764"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).sendFile(path.join(__dirname+'/public/index.html'));
  // res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
});

app.get('/summoner/', function(req, res) {
  res.status(200).sendFile(path.join(__dirname+'/public/summoner/index.html'));
  // res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
});

app.get('/champions/', function(req, res) {
  var url = "http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json";
  request({
    url: url,
    json: true
  }, function (err, response, body) {
      console.log(body);
  });
});

app.get('/championData/', function(req, res) {
  console.log("am i even being called");
  let query = api.liveQuery('champions');
  query.equalTo('name', 'Yasuo');

  // let query = api.liveQuery('champions');
// console.log("query does something like this" + query);
// function(err, response, body) {
  
  // let query = new Parse.Query('champions');
  // query.equalTo('name', 'Yasuo');
  let test = query.subscribe();
  console.log("test results in " + test);
  res.status(200).send(test);
  // con.connect(function(err) {
  //   con.query("SELECT * FROM champions", function(err, result, fields) {
  //     if(err) throw err;
  //     console.log(result);
  //   });
  // });
});

app.get('/champions/:name', function(req, res) {
  request({
        url: "https://na1.api.riotgames.com/lol/static-data/v3/champions/"+ req.params.name +"?locale=en_US&dataById=true&api_key=" + riotDevKey,
        json: true,
      }, function(err, response, body) {
        res.status(200).send(body);
    });
});

app.get('/items/', function(req, res) {
  request({
        url: "https://na1.api.riotgames.com/lol/static-data/v3/items?locale=en_US&dataById=true&api_key=" + riotDevKey,
        json: true,
      }, function(err, response, body) {
        res.status(200).send(body);
    });
});

app.get('/matchInfo/:name', function(req, res) {
  request({
        url: "https://na1.api.riotgames.com/lol/match/v3/matches/" + req.params.name + "?api_key=" + riotDevKey,
        json: true,
      }, function(err, response, body) {
        res.status(200).send(body);
    });
});

app.get('/summoner/:name', function(req, res) {

  var url = "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/" + req.params.name + "?api_key=" + riotDevKey;
  request({
    url: url,
    json: true
  }, function (err, response, body) {
      console.log(body);
      request({
        url: "https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/" + body.accountId + "?endIndex=10&api_key=" + riotDevKey,
        json: true,
      }, function(err, response, body) {
        res.status(200).send(body);
      });
  });
});
// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

app.get('/update/', function(req, res) {
  var url = "http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json";
  request({
    url: url,
    json: true
  }, function (err, response, body) {
      console.log(body);
  });
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
