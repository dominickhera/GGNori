// console.log("lol cats");
// document.getElementByID('summonerSearchButton').onclick = function()
// {
//     // console.log("why")
  // document.getElementById("demo").innerHTML =  "The full URL of this page is:<br>" + window.location.href;
// }

// ("summonerSearchForm").onsubmit(){
  // document.getElementById("demo").innerHTML = "The full URL of this page is:<br>" + window.location.href;
// }
window.onload = function() {
console.log("why");

$.ajax({
    url: "summoner/",
    type: 'GET',
    // beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', '*');},
  //   // url: "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/Herasy?api_key=RGAPI-68212aa1-b941-4343-9cfd-88b7180525c1",
  // //   // url: "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/Herasy",
    // dataType: "json",

    success: function(data) {
      console.log("it works wtf");
      console.log(data);
      // document.getElementById("demo2").innerHTML = data;
  // //     // for (i=0; i < data.length; i++) {
  // //       // cryptoArray.push(data[i]);
  // //       // $("#cryptoDataList").append("<li>"+ cryptoArray[i].id + "</li>");
  // //     //  if(cryptoArray[i].percent_change_1h > 0)
  // //     //  {
  // //         // $("#cryptoList").append("<option value=\"" + cryptoArray[i].id + "\">" + cryptoArray[i].id + "</option>");
  // //     //  }
  //     // }
  // //     // selectionSort(cryptoArray);
    },
        fail: function(error) {
            
            // Non-200 return, do something with error
            console.log(error); 
        }
  });

  console.log("wtf");
}
// function test() {
//    // document.getElementById("demo").innerHTML =  "The full URL of this page is:<br>" + window.location.href;
//   console.log("succes");
//    $(document).ajax({
//     url: "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/Herasy?api_key=RGAPI-68212aa1-b941-4343-9cfd-88b7180525c1",
//     dataType: "json",
//     // hearers: {
//     //  "Origin": "https://developer.riotgames.com",
//     //  "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
//     //  "X-Riot-Token": "RGAPI-68212aa1-b941-4343-9cfd-88b7180525c1",
//     //  "Accept-Language": "en-us",
//     //  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.1 Safari/605.1.15"
//     // },
//     success: function(data) {
//       console.log(data);
//     }
//   });
// }

// document.getElementById("demo").innerHTML = 
// "The full URL of this page is:<br>" + window.location.href;

// document.getElementById("message").getElementByClass("demo").innerHTML = 
// "The full URL of this page is:<br>" + window.location.href;
// // $(document).ready(function() {
 // $.ajax({
 //    url: "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/Herasy?api_key=RGAPI-68212aa1-b941-4343-9cfd-88b7180525c1",
 //    dataType: "json",
 //    // hearers: {
 //    // 	"Origin": "https://developer.riotgames.com",
 //   	// 	"Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
 //    // 	"X-Riot-Token": "RGAPI-68212aa1-b941-4343-9cfd-88b7180525c1",
 //    // 	"Accept-Language": "en-us",
 //    // 	"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.1 Safari/605.1.15"
 //    // },
 //    success: function(data) {
 //      console.log(data);
 //    }
 //  });
// // }

// document.getElementByID('summonerSearchButton').onclick = function()
// {
//     console.log("why")
// }
// console.log("hello")