
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