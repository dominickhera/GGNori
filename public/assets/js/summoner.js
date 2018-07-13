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
  // var searchUrl = "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/" + tempUsername + "?api_key=RGAPI-68212aa1-b941-4343-9cfd-88b7180525c1";
    var championList = []
    $.ajax({
    url: "/champions/",
    type: 'get',
  //   // url: "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/Herasy?api_key=RGAPI-68212aa1-b941-4343-9cfd-88b7180525c1",
  // //   // url: "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/Herasy",
    dataType: "json",

    success: function(data) {
      championList = data;
      // for (i = 0; i < data.length; i++ ) {
        // championList
      // }

    },
        fail: function(error) {
            
            // Non-200 return, do something with error
            console.log(error); 
        }
  });


  //   var itemList = [];
  //   $.ajax({
  //   url: "/items/",
  //   type: 'get',
  // //   // url: "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/Herasy?api_key=RGAPI-68212aa1-b941-4343-9cfd-88b7180525c1",
  // // //   // url: "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/Herasy",
  //   dataType: "json",

  //   success: function(data) {
  //     itemList = data;
  //     // for (i = 0; i < data.length; i++ ) {
  //       // championList
  //     // }

  //   },
  //       fail: function(error) {
            
  //           // Non-200 return, do something with error
  //           console.log(error); 
  //       }
  // });


var matchList = [];

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
          let tempLabel = "champAndLevelLabel" + (i + 1);
          let innerTempLabel = "innerChampionPlayedAndLevelLabel" + (i + 1);
          let utcSeconds = data.matches[i].timestamp;
          let d = new Date(0); 
          d.setUTCSeconds(utcSeconds);
          matchList = data;
          // console.log(tempLabel);
          // document.getElementById(tempLabel).innerHTML = "Match Length: " + <br> "Champion Played: " + championList.data[data.matches[i].champion].name + " - Date: " + d;

           // var championList = []
            $.ajax({
            url: "/matchInfo/"+ data.matches[i].gameId,
            type: 'get',
          //   // url: "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/Herasy?api_key=RGAPI-68212aa1-b941-4343-9cfd-88b7180525c1",
          // //   // url: "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/Herasy",
            dataType: "json",

            success: function(data) {
              let userMatchID = 0;
            for (k = 0; k < data.participantIdentities.length; k++){
                if(data.participantIdentities[k].player.summonerName == tempUsername) {
                  userMatchID = k + 1;
                  console.log("k shit is " + k);
                     // userMatchID = k + 1;
                   }
                }
                  let spell1 = data.participants[userMatchID - 1].spell1Id;
                  let spell2 = data.participants[ userMatchID - 1].spell2Id;
                  let championLevel = data.participants[userMatchID - 1].stats.champLevel;
                  let totalCS = data.participants[userMatchID - 1].stats.totalMinionsKilled;
                  let winCondition = "";
                  let kdaStat = (data.participants[userMatchID - 1].stats.kills + data.participants[userMatchID - 1].stats.assists) / data.participants[userMatchID - 1].stats.deaths;
                //   let csPM = totalCS / (data.gameDuration / 60;);
                  if (data.participants[k].stats.win == true) {
                      winCondition.innerHTML = "Win";
                  } else {
                      winCondition.innerHTML = "Loss";
                  }
                //   let tempTableName = "itemBuild" + (k + 1);
                //   var tempTable = document.getElementById(tempTableName);
                //   // var itemBuild = [];
                //   for(m = 0; m < 6; m++) {
                //     let tempName = "item" + m;
                //     let tempRow = tempTable.insertRow(m+1);
                //     let tempCell = tempRow.insertCell(0);
                //     tempCell.innerHTML = itemList.data[data.participants[k].stats.tempName].name
                //     // itemBuild.push(data.participants[k].stats.tempName);
                //   }

                  let gameDuration = data.gameDuration / 60;
                  document.getElementById(tempLabel).innerHTML = "Outcome: "+ winCondition + "Match Length: " +  gameDuration + " minutes" <br> "Champion Played: " + championList.data[matchList.matches[i].champion].name + " - Date: " + d;
                //   // for (i = 0; i < data.length; i++ ) {
                //     // championList
                //   // }
                //   let tempCreepLabel = "innerTotalCSAndCSPMLabel" + (i + 1);
                //   document.getElementById(tempCreepLabel).innerHTML = "Total CS: " + totalCS + " - CS/Minute: " + csPM;

                //   // document.getElementById(innerTempLabel).innerHTML = championList.data[matchList.matches[i].champion].name + " - Level: " + champLevel;

                // }
            // }


              //  let gameDuration = data.gameDuration / 60;
              //  document.getElementById(tempLabel).innerHTML = "Outcome: "+ winCondition + "Match Length: " +  gameDuration + " minutes" <br> "Champion Played: " + championList.data[matchList.matches[i].champion].name + " - Date: " + d;
              // // for (i = 0; i < data.length; i++ ) {
              //   // championList
              // // }
              // let tempCreepLabel = "innerTotalCSAndCSPMLabel" + i;
              // document.getElementById(tempCreepLabel).innerHTML = 
            },
                fail: function(error) {
                    
                    // Non-200 return, do something with error
                    console.log(error); 
                }
          });
          // document.getElementById(innerTempLabel).innerHTML = "Champion Played: " + championList.data[data.matches[i].champion].name + " - Time/Length: " + data.matches[i].timestamp;
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
