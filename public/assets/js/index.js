
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
  let query = new Parse.Query('champions');
  query.equalTo('name', 'Yasuo');
  let subscription = query.subscribe();
console.log(subscription);
}
