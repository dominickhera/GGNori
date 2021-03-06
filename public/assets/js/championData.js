/**
 *  Steps handler
 */

var Steps = {};

Steps.init = function() {
  this.buildParseUrl();
  this.bindBtn('#step-1-btn', function(e){
    ParseRequest.postData();
    e.preventDefault();
  })
}

Steps.buildParseUrl = function() {
  var url = Config.getUrl();
  $('#parse-url').html(url + '/parse');
}

Steps.bindBtn = function(id, callback) {
  $(id).click(callback);
}

Steps.closeStep = function(id) {
  $(id).addClass('step--disabled');
}

Steps.openStep  = function(id) {
  $(id).removeClass('step--disabled');
}

Steps.fillStepOutput  = function(id, data) {
  $(id).html('Output: ' + data).slideDown();
}

Steps.fillStepError  = function(id, errorMsg) {
  $(id).html(errorMsg).slideDown();
}


Steps.fillBtn  = function(id, message) {
  $(id).addClass('success').html('✓  ' + message);
}

Steps.showWorkingMessage = function() {
  $('#step-4').delay(500).slideDown();
}

window.onload = function() {
  ParseRequest.getData();
  // e.preventDefault();
  XHR.GET('/parse/classes/champions');

  // console.log(data);


}

testConsolePrint = function(data) {
  // console.log("found this" + data);
  let stringData = JSON.parse(data);
  // stringData.sort();
  console.log("string data brings back " + stringData.results);
  let jsonLength = stringData.results.length;
  // for (i = 0; i < jsonLength; i++ ) {
    // console.log("item[" + i + "]: " + stringData.results[i].name);
  // }

  $("#cardTitle").html(stringData.results[0].name);
  $("#cardDescription").html(stringData.results[0].blurb);
  // let stringCount = stringData['results']
  console.log("also heres just data: "+ data);
  var newDiv = document.createElement('#championCard');
  // d.appendChild(newDiv);
  var newRow = document.createElement('#championRow');
  $('#championRow').append(newRow);
}



getBase64Image = function(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  var dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

/**
 *  Parse requests handler
 */

var ParseRequest = {};

ParseRequest.postData = function() {
  XHR.setCallback(function(data){
    // store objectID
    Store.objectId = JSON.parse(data).objectId;
    // close first step
    Steps.closeStep('#step-1');
    Steps.fillStepOutput('#step-1-output', data);
    Steps.fillBtn('#step-1-btn', 'Posted');
    // open second step
    Steps.openStep('#step-2');
    Steps.bindBtn('#step-2-btn', function(e){
      ParseRequest.getData();
      e.preventDefault();
    });
  },
  function(error) {
       Steps.fillStepError('#step-1-error', 'There was a failure: ' + error);
   });
  XHR.POST('/parse/classes/GameScore');
};

ParseRequest.getData = function() {
  XHR.setCallback(function(data){
    // close second step
    Steps.closeStep('#step-2');
    Steps.fillStepOutput('#step-2-output', data);
    testConsolePrint(data);
    Steps.fillBtn('#step-2-btn', 'Fetched');
    // open third step
    Steps.openStep('#step-3');
    Steps.bindBtn('#step-3-btn', function(e){
      ParseRequest.postCloudCodeData();
      e.preventDefault();
      });
    },
    function(error) {
    	Steps.fillStepError('#step-2-error', 'There was a failure: ' + error);
  });  
  XHR.GET('/parse/classes/champions');
};

ParseRequest.postCloudCodeData = function() {
  XHR.setCallback(function(data){
    // close second step
    Steps.closeStep('#step-3');
    Steps.fillStepOutput('#step-3-output', data);
    Steps.fillBtn('#step-3-btn', 'Tested');
    // open third step
    Steps.showWorkingMessage();
    },
    function(error) {
    	Steps.fillStepError('#step-3-error', 'There was a failure: ' + error);
    });  
  XHR.POST('/parse/functions/hello');
}


/**
 * Store objectId and other references
 */

var Store = {
  objectId: ""
};

var Config = {};

Config.getUrl = function() {
  if (url) return url;
  var port = window.location.port;
  var url = window.location.protocol + '//' + window.location.hostname;
  if (port) url = url + ':' + port;
  return url;
}


/**
 * XHR object
 */

var XHR = {};

XHR.setCallback = function(callback, failureCallback) {
  this.xhttp = new XMLHttpRequest();
  var _self = this;
  this.xhttp.onreadystatechange = function() {
    if (_self.xhttp.readyState == 4) {
      if (_self.xhttp.status >= 200 && _self.xhttp.status <= 299) {
        callback(_self.xhttp.responseText);
      } else {
        failureCallback(_self.xhttp.responseText);
      }
    }
  };
}

XHR.POST = function(path, callback) {
  var seed = {"score":1337,"playerName":"Sean Plott","cheatMode":false}
  this.xhttp.open("POST", Config.getUrl() + path, true);
  this.xhttp.setRequestHeader("X-Parse-Application-Id", $('#appId').val());
  this.xhttp.setRequestHeader("Content-type", "application/json");
  this.xhttp.send(JSON.stringify(seed));
}

XHR.GET = function(path, callback) {
  console.log(Store.objectId);
  this.xhttp.open("GET", Config.getUrl() + path + '/', true);
  this.xhttp.setRequestHeader("X-Parse-Application-Id", $('#appId').val());
  this.xhttp.setRequestHeader("Content-type", "application/json");
  this.xhttp.send(null);
}


/**
 *  Boot
 */

Steps.init();
