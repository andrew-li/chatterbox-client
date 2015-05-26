// YOUR CODE HERE:

var App = function() {
  this.server = 'https://api.parse.com/1/classes/chatterbox';
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
    .replace(/\"/g, '')
    .replace(/\'/g, '');
};


App.prototype.addRooms = function() {
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

  for(var roomName in this.roomList)
  {
    this.addRoom(roomName);
  }
};

App.prototype.addRoom = function(roomName) {

    var tempRoomName;
    if(roomName === '')
      tempRoomName = "EmptyRoom";
    else
      tempRoomName = roomName;

    var room = '<div '
    + 'id="'
    + tempRoomName
    + '" class="room">'
    + tempRoomName;

    for(var i = 0; this.roomList.hasOwnProperty(roomName) && i < this.roomList[roomName].length; i++)
    {
      room += '<span class="username message">'
       + this.roomList[roomName][i].username
       + ': '
       + this.roomList[roomName][i].text
       + '</span>';
    }

    room += '</div>';

    $('#main').append(room);
};

App.prototype.addMessage = function(message) {
  //find roomname in dom
  //target that roomname and append the message
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

    console.log(stringifiedRoomName);
    console.log(this.roomList[stringifiedRoomName]);
    this.roomList[stringifiedRoomName].push({"username" : stringifiedUserName,
                                        "text" : stringifiedText,
                                        "roomname" : stringifiedRoomName});
  };

  console.log(this.roomList);

  this.addRooms();

};

App.prototype.fetch = function() {

  var oldThis = this;
  $.ajax({
    // always use this url
    url: this.server,
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

App.prototype.send = function(message) {
  $.ajax({
    // always use this url
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

App.prototype.clearMessages = function() {
  $('.room').remove();
};

App.prototype.refresh = function() {
  this.clearMessages();
  this.fetch();
};

App.prototype.init = function() {
  this.fetch();
  //setInterval(this.refresh.bind(this), 5000);
};

var app = new App();

app.init();

app.send({username: "SF BOUND",
          text: "|[]   []   []||[]   []   []||[]   []   []||[]   []   []||[]   []   []||[]   []   []||[]   []   []||[]   []   []||[]   []   []||[]   []   []||[]   []   []|",
          roomname: "BART"
});

console.log(app);





