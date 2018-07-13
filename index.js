// Example express application adding the parse-server module to expose Parse
// compatible API routes.
var riot = require("riot-api-nodejs");
var Irelia = require('irelia');
var request = require('request');
var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');
var irelia = new Irelia({
  secure: true,
  key: 'RGAPI-68212aa1-b941-4343-9cfd-88b7180525c1',
  debug: true
});
riot.developerKey = "RGAPI-68212aa1-b941-4343-9cfd-88b7180525c1";
var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || '', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',  // Don't forget to change to https if needed
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

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


app.get('/summoner/:name', function(req, res) {
  // riot.summoner.byName(
    // req.params.name, //or 'Dyrus,I DIED TO WOLVES,InsertSmurfHere'
    // {},
    // console.log(riot.summoner.byName(req.params.name));
// );
  // res.status(200).send(riot.summoner.byName(req.params.name)); //or 'Dyrus,I DIED TO WOLVES,InsertSmurfHere'
    // {},
    // console.log
// ));
  var url = "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/" + req.params.name + "?api_key=RGAPI-68212aa1-b941-4343-9cfd-88b7180525c1";
  request({
    url: url,
    json: true
  }, function (err, response, body) {
    // if(!error && response.statusCode == 200) {
      res.status(200).send(body);
    // }
    // else
    // {
      // res.status(200).send("booty");
    // }
  });
  res.status(200).send(req.params.name);
  // res.status(200).sendFile(path.join(__dirname+'/public/test.html'));
});
// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
