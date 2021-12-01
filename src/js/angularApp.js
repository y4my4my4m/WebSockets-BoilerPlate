var app = angular.module("chatapp", []);

app.controller("chatController", function ($scope) {

  $scope.chatMessages = [];

  $scope.userName = prompt("Enter your ChatName");

  var socket = io.connect('http://localhost:8080', {
    transports: ['polling', 'websocket'],
    upgrade: true
  });
  socket.on("connect", function () {

    socket.emit('join', $scope.userName);
    socket.on('ping', (ping) => {
      console.log("socket ping: ", ping);
    });
    socket.on('pong', (pong) => {
        console.log("socket pong: ", pong);
    });
  });

  socket.on("messages", function (data) {
    $scope.$apply(function () {
      addChat(data, true);
    });
  });


  socket.on('upgrade', function (name) {
    $scope.$apply(function () {
      var messageObj = {
        username: 'CHAT_BOT',
        chat: `${name} upgraded`
      };
      console.log(`UPGRADED`);
      addChat(messageObj, true);
    });
  });

  socket.on("connect_error", (err) => {
    // revert to classic upgrade
    // socket.io.opts.transports = ["polling", "websocket"];
    console.log(`CONNECT_ERROR: `, err);
    console.log(`CONNECT_ERROR MSG: `, err.message);
  });

  socket.on("reconnect_error", (err) => {
    console.log(`reconnect_error: `, err);
  });
  socket.on("reconnect_failed", (err) => {
      console.log(`reconnect_failed: `, err);
  });

  socket.on("reconnect_attempt", (err) => {
    console.log(`reconnect_attempt: `, err);
  });

  socket.on("reconnect", (err) => {
    console.log(`reconnect: `, err);
  });

  socket.on('removechatter', function (name) {
    $scope.$apply(function () {
      var messageObj = {
        username: 'CHAT_BOT',
        chat: `${name} left the chat...`
      };
      addChat(messageObj, true);
    });
  });

  $('#sendChat').click(function () {
    // contruct the message object and emit the messages event to server
    var chatText = $('#chatText').val();
    var messageObj = {
      username: $scope.userName,
      chat: chatText
    }

    socket.emit("messages", messageObj);
    $scope.$apply(function () {
      addChat(messageObj, false);
    });
  });


  function addChat(msgObj, fromServer) {
    $scope.chatMessages.push(msgObj);
    if (!fromServer) {
      $('#chatText').val('');
    }
  }

  function removeChatters(name) {

    var messageObj = {
      username: 'CHAT_BOT',
      chat: name + ' left the chat...'
    };
    addChat(messageObj, true);
  }
});