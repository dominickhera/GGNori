
window.onload = function() {
    var championList = [];
    $.ajax({
    url: "/championData/",
    type: 'get',
    dataType: "json",

    success: function(data) {
      // championList = data;
      console.log(data);
    },
    fail: function(error) {
            
            // Non-200 return, do something with error
        console.log(error); 
    }
  });

console.log("champ list bb");
}

function forceGrabChampionList() {
  var championList = [];
    $.ajax({
    url: "/championData/",
    type: 'get',
    dataType: "json",

    success: function(data) {
      // championList = data;
      console.log(data);
    },
    fail: function(error) {
            
            // Non-200 return, do something with error
        console.log(error); 
    }
  });
}

