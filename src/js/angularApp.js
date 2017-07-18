var app=angular.module("chatapp",[]);

app.controller("chatController",function($scope){

    $scope.chatMessages=[];

    $scope.userName=prompt("Enter your ChatName");

    var socket=io.connect('http://localhost:8080');
    socket.on("connect",function(){
      
      //  socket.emit('join',$scope.userName);
    });
   //
  //   socket.on("messages",function(data){
  //   $scope.$apply(function(){
  //       addChat(data,true);
  //   });
  //   });
   //
   //
  //   socket.on('removechatter',function(name){
  //       $scope.$apply(function(){
  //         var messageObj={ username:'CHAT_BOT',chat:name+' left the chat...'};
  //         addChat(messageObj,true);
  //       });
  //   });
   //
  //   $('#sendChat').click(function(){
  //  // contruct the message object and emit the messages event to server
  //   var chatText=$('#chatText').val();
  //   var messageObj={ username:$scope.userName,chat:chatText}
   //
  //   socket.emit("messages",messageObj);
  //       $scope.$apply(function(){
  //          addChat(messageObj,false);
  //       });
  //   });
   //
   //
  //   function addChat(msgObj,fromServer){
  //       $scope.chatMessages.push(msgObj);
  //       if(!fromServer){
  //            $('#chatText').val('');
  //       }
   //
   //
  //   }
   //
  //   function removeChatters(name){
   //
  //       var messageObj={ username:'CHAT_BOT',chat:name+' left the chat...'};
  //       addChat(messageObj,true);
  //   }
});
