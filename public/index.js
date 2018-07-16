
window.onload = function() {

$.ajax({
    url: "summoner/",
    type: 'GET',
    success: function(data) {

    },
        fail: function(error) {
            
            // Non-200 return, do something with error
            console.log(error); 
        }
  });

}