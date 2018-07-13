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
document.getElementById("summonerUserNameLabel").innerHTML = tempUsername;

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
    var championList = [];
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


  //   var itemList = []
  //   $.ajax({
  //   url: "/champions/",
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
          // console.log(tempLabel);
          document.getElementById(tempLabel).innerHTML = "Champion Played: " + championList.data[data.matches[i].champion].name + " - Date: " + d;
          matchList = data.matches;
           // var championList = []
           var gameDuration = 0;
           var summonerSpell1 = "";
           var summonerSpell2 = "";
           var championLevel = 0;
           var totalCS = 0;
           var csPM = 0;
           var winCondition = "";
           var gameKills = 0;
           var gameAssists = 0;
           var gameDeaths = 0;
           var kdaStat = 0;
            $.ajax({
            url: "/matchInfo/"+ data.matches[i].gameId,
            type: 'get',
          //   // url: "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/Herasy?api_key=RGAPI-68212aa1-b941-4343-9cfd-88b7180525c1",
          // //   // url: "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/Herasy",
            dataType: "json",

            success: function(matchData) {
              console.log(matchData);

              for (k=0; k < matchData.participantIdentities.length; k++){ 
                if (matchData.participantIdentities[k].player.summonerName == tempUsername) {
                  summonerSpell1 = matchData.participants[k].spell1Id;
                  summonerSpell2 = matchData.participants[k].spell12d;
                  gameDuration = matchData.gameDuration / 60;
                  championLevel = matchData.participants[k].stats.champLevel;
                  totalCS = matchData.participants[k].stats.totalMinionsKilled;
                  gameKills = matchData.participants[k].stats.kills;
                  gameDeaths = matchData.participants[k].stats.deaths;
                  gameAssists = matchData.participants[k].stats.assists;

                  if(matchData.participants[k].stats.win == true) {
                    winCondition = "Win";
                  } else {
                    winCondition = "Loss";
                  }
                  kdaStat = (gameKills + gameAssists) / gameDeaths;
                  csPM = (totalCS/ gameDuration);
                  // let tempHeaderLabel = "innerChampionPlayedAndLevelLabel" + (i + 1);
                  // document.getElementById(tempHeaderLabel).innerHTML = "Result: " + winCondition + " - Duration: " + gameDuration + " Minutes";
                  // console.log("Result: " + winCondition + " - Duration: " + gameDuration + " Minutes");
                  // let tempCreepLabel = "innerTotalCSAndCSPMLabel" + (i + 1);
                  // document.getElementById(tempCreepLabel).innerHTML = "Total CS: " + totalCS + " - CS/Minute: " + csPM;
                  // console.log("Total CS: " + totalCS + " - CS/Minute: " + csPM);
                  // console.log(matchData.participants[k]);
                }
              }
              // championList = data;
              // for (i = 0; i < data.length; i++ ) {
                // championList
              // }
              // let tempLabel = "innerChampionPlayedAndLevelLabel1" + (i + 1);
               // document.getElementById(tempLabel).innerHTML = "Champion Played: " + championList.data[data.matches[i].champion].name + " - Date: " + d;

            },
                fail: function(error) {
                    
                    // Non-200 return, do something with error
                    console.log(error); 
                }
          });

            let tempHeaderLabel = "innerChampionPlayedAndLevelLabel" + (i + 1);
            document.getElementById(tempHeaderLabel).innerHTML = "Result: " + winCondition + " - Duration: " + gameDuration + " Minutes";
            console.log("Result: " + winCondition + " - Duration: " + gameDuration + " Minutes");
            let tempCreepLabel = "innerTotalCSAndCSPMLabel" + (i + 1);
            document.getElementById(tempCreepLabel).innerHTML = "Total CS: " + totalCS + " - CS/Minute: " + csPM;
            console.log("Total CS: " + totalCS + " - CS/Minute: " + csPM);
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
