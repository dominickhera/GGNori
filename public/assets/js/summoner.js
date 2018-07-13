// var test = require('url');
// $.ready(function() {
// window.onload = function() {
 // var urlParse = window.location.href;
var query = location.search.substr(1);
var result = {};
query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
});
console.log(result.userName);
var tempUsername = result.userName;
document.getElementById("summonerUserNameLabel").innerHTML = tempUsername

// window.onload = function() {
// var query = location.search.substr(1);
// var result = {};
// query.split("&").forEach(function(part) {
//     var item = part.split("=");
//     result[item[0]] = decodeURIComponent(item[1]);
// });
// console.log(result);
// var tempUsername = result.userName;
// document.getElementById("summonerUserNameLabel").innerHTML = tempUsername
  // var urlSearch = newURL(urlParse);
  // var summonerUserName = urlSearch.searchParams.get("userName");
  // console.log(urlParse);
  var searchUrl = "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/" + tempUsername + "?api_key=RGAPI-68212aa1-b941-4343-9cfd-88b7180525c1";
  $.ajax({
    url: "/summoner/" + tempUsername,
    type: 'get',
  //   // url: "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/Herasy?api_key=RGAPI-68212aa1-b941-4343-9cfd-88b7180525c1",
  // //   // url: "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/Herasy",
    dataType: "json",

    success: function(data) {
      console.log(data);
      document.getElementById("demo2").innerHTML = data;
      for (i=0; i < data.matches.length; i++) {
        // for(let match of data) {
          console.log(data.matches[i].champion);
          let tempLabel = "champAndLevelLabel" + i;
          // console.log(tempLabel);
          document.getElementById(tempLabel).innerHTML = "Champion Played: " + data.matches[i].champion + " - Time/Lenth: " + data.matches[i].timestamp;
        }

  //       // cryptoArray.push(data[i]);
  // //       // $("#cryptoDataList").append("<li>"+ cryptoArray[i].id + "</li>");
  // //     //  if(cryptoArray[i].percent_change_1h > 0)
  // //     //  {
  // //         // $("#cryptoList").append("<option value=\"" + cryptoArray[i].id + "\">" + cryptoArray[i].id + "</option>");
  // //     //  }
      // }
  // //     // selectionSort(cryptoArray);
    },
        fail: function(error) {
            
            // Non-200 return, do something with error
            console.log(error); 
        }
  });
console.log("hella");
// document.getElementById("demo2").innerHTML = searchUrl
console.log(window.location.href);
// document.getElementById("summonerUserName").innerHTML = result;
// }
// $('form').submit(function(e){
//   e.preventDefault();
// console.log("lolbfadsljfakldsfj")
// document.getElementById("demo").innerHTML = "The full URL of this page is:<br>" + window.location.href;

// }

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

function forceSetName() {
  var query = location.search.substr(1);
  var result = {};
  query.split("&").forEach(function(part) {
      var item = part.split("=");
      result[item[0]] = decodeURIComponent(item[1]);
  });
  console.log(result);
  var tempUsername = result.userName;
  document.getElementById("summonerUserNameLabel").innerHTML = tempUsername
}
  // $.ajax({
  //   // url: "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/Herasy?api_key=RGAPI-68212aa1-b941-4343-9cfd-88b7180525c1",
  //   url: "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/Herasy",
  //   dataType: "json",

  //   success: function(data) {
  //     console.log(data);
  //     // for (i=0; i < data.length; i++) {
  //       // cryptoArray.push(data[i]);
  //       // $("#cryptoDataList").append("<li>"+ cryptoArray[i].id + "</li>");
  //     //  if(cryptoArray[i].percent_change_1h > 0)
  //     //  {
  //         // $("#cryptoList").append("<option value=\"" + cryptoArray[i].id + "\">" + cryptoArray[i].id + "</option>");
  //     //  }
  //     // }
  //     // selectionSort(cryptoArray);
  //   }
  // });
// }
