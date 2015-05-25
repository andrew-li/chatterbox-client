// YOUR CODE HERE:


var makeRoom = function(roomData) {
  var room = '<div>'
    + JSON.stringify(roomData.roomname)
    + '</div>';

  return room;
};


var handleData = function(data) {
  console.log(data);

  //var results = data.results;

  // for(var i = 0; i < results.length; i++)
  // {
  //   console.log(results[i].objectId);
  //   console.log(results[i].roomname);
  // }

  var sortedResults = _.sortBy(data.results, function(item) {
    return item.roomname;
  });

  console.log(sortedResults);


  for(var i = 0; i < sortedResults.length; i++)
  {
    $('#main').append(makeRoom(sortedResults[i]));
  }


};

var getMessages = function() {

  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message received');

      handleData(data);

    },
    error: function () {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message');
    }
  });

};


var init = function() {
  getMessages();
};

init();
