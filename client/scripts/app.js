// YOUR CODE HERE:

var App = function() {
  this.roomList = {};
};

App.prototype.replaceEscapeCharacters = function(str) {
  var tempStr;
  if(str === undefined)
    tempStr = "undefined";
  else if(str === null)
    tempStr = "null";
  else
   tempStr = JSON.stringify(str);

  return tempStr.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#39;');
};

App.prototype.makeRooms = function() {

  // var roomname;
  // if(roomData.roomname === undefined)
  //   roomname = "undefined";
  // else if(roomData.roomname === null)
  //   roomname = "null";
  // else
  //  roomname = replaceEscapeCharacters(JSON.stringify(roomData.roomname));

  // var room = '<div>'
  //   + roomname
  //   + JSON.stringify(roomData.text)
  //   + '</div>';

  // return room;

  var room;
  for(var roomName in this.roomList)
  {
    room = '<div>'
    + roomName
    + '</div>';

    $('#main').append(room);
  }

};

App.prototype.handleData = function(data) {
  console.log(data);

  //var results = data.results;

  // for(var i = 0; i < results.length; i++)
  // {
  //   console.log(results[i].objectId);
  //   console.log(results[i].roomname);
  // }

  // var sortedResults = _.sortBy(data.results, function(item) {
  //   return item.roomname;
  // });

  // console.log(sortedResults);


  // for(var i = 0; i < sortedResults.length; i++)
  // {
  //   $('#main').append(makeRoom(sortedResults[i]));
  // }


  for (var i = 0; i < data.results.length; i++) {
    var stringifiedRoomName = this.replaceEscapeCharacters(data.results[i].roomname);
    var stringifiedUserName = this.replaceEscapeCharacters(data.results[i].username);
    var stringifiedText = this.replaceEscapeCharacters(data.results[i].text);

    if (data.results[i].hasOwnProperty(stringifiedRoomName) === false) {
      this.roomList[stringifiedRoomName] = [];
    }
    this.roomList[stringifiedRoomName].push({"username" : stringifiedUserName,
                                        "text" : stringifiedText});
  };

  console.log(this.roomList);

  this.makeRooms();

};

App.prototype.getMessages = function() {

  var oldThis = this;
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message received');

      oldThis.handleData(data);

    },
    error: function () {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message');
    }
  });

};

App.prototype.init = function() {
  this.getMessages();
};

var app = new App();

app.init();

console.log(app);





