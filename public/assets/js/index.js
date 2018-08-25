
window.onload = function() {
    var championList = [];
    $.ajax({
    url: "/update",
    type: 'get',
    dataType: "json",

    success: function(data) {
      championList = data;
      console.log(championList);
    },
    fail: function(error) {
            
            // Non-200 return, do something with error
        console.log(error); 
    }
  });

console.log("why");
}
