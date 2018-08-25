var query = location.search.substr(1);
var result = {};
query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
});
console.log(result.userName);
var tempUsername = result.userName;
document.getElementById("summonerUserNameLabel").innerHTML = tempUsername;

window.onload = function() {

    var championList = [];
    $.ajax({
    url: "/championData/",
    type: 'get',
    dataType: "json",

    success: function(data) {
      championList = data;
      console.log(data);
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
    dataType: "json",

    success: function(data) {
      console.log(data);
      document.getElementById("demo2").innerHTML = data;
      for (i=0; i < data.matches.length; i++) {
          console.log(data.matches[i].champion);
          let tempLabel = "champAndLevelLabel" + (i + 1);
          let innerTempLabel = "innerChampionPlayedAndLevelLabel" + (i + 1);
          let utcSeconds = data.matches[i].timestamp;
          let d = new Date(0); 
          d.setUTCSeconds(utcSeconds);
          document.getElementById(tempLabel).innerHTML = "Champion Played: " + championList.data[data.matches[i].champion].name + " - Date: " + d;
          matchList = data.matches;
            $.ajax({
            url: "/matchInfo/"+ data.matches[i].gameId,
            type: 'get',
            dataType: "json",

            success: function(matchData) {
              console.log(matchData);
              console.log(matchData.gameDuration);
              let tempUsernameID = 0;
              for (k=0; k < matchData.participantIdentities.length; k++){ 
                if (matchData.participantIdentities[k].player.summonerName == tempUsername) {
                  tempUsernameID = k;
                }
              }
           let gameDurationMinutes = matchData.gameDuration / 60;
           let summonerSpell1 = matchData.participants[tempUsernameID].spell1Id;;
           let summonerSpell2 = matchData.participants[tempUsernameID].spell2Id;;
           let championLevel = matchData.participants[tempUsernameID].stats.champLevel;
           let totalCS = matchData.participants[tempUsernameIDp].stats.totalMinionsKilled;
           let csPM = (totalCS / gameDurationMinutes);
           // let winCondition = "";
           let gameKills = matchData.participants[tempUsernameID].stats.kills;
           let gameAssists = matchData.participants[tempUsernameID].stats.assists;
           let gameDeaths = matchData.participants[tempUsernameID].stats.deaths;
           let kdaStat = (gameKills + gameAssists) / gameDeaths;

                  if(matchData.participants[tempUsernameID].stats.win == true) {
                    let winCondition = "Win";
                  } else {
                    let winCondition = "Loss";
                  }

                  let tempHeaderLabel = "innerChampionPlayedAndLevelLabel" + (i + 1);
                  document.getElementById(tempHeaderLabel).innerHTML = "Result: " + winCondition + " - Duration: " + gameDuration + " Minutes";
                  console.log("Result: " + winCondition + " - Duration: " + gameDurationMinutes + " Minutes");
                  let tempCreepLabel = "innerTotalCSAndCSPMLabel" + (i + 1);
                  document.getElementById(tempCreepLabel).innerHTML = "Total CS: " + totalCS + " - CS/Minute: " + csPM;
                  console.log("Total CS: " + totalCS + " - CS/Minute: " + csPM);
                  console.log(matchData.participants[k]);
            },
                fail: function(error) {
                    
                    // Non-200 return, do something with error
                    console.log(error); 
                }
          });
        }
    },
        fail: function(error) {
            
            // Non-200 return, do something with error
            console.log(error); 
        }
  });

console.log(window.location.href);


}

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
