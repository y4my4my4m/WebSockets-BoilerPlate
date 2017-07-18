var express = require('express');
var app = express();
var server = require('http').createServer(app);
var PORT=8080;

var io = require('socket.io')(server);


io.on('connection', function (client) {

    console.log('client connected');

        // client.on('join', function (nickName) {
        //         console.log("user - ",nickName, "joined");
        //
        //         client.nickName = nickName;
        // });
        //
        // client.on('messages', function (data) {
        //           client.broadcast.emit('messages', data);
        //           //saveMessages(data);
        // });
        //
        //  client.on('disconnect',function(){
        //           console.log("user -"+client.nickName+" left the chat");
        //           client.broadcast.emit('removechatter',client.nickName);
        //
        //
        //   });

});



app.use(express.static('public'));
app.use(express.static('src'));
app.get('/', function (req, res) {

    res.sendFile(__dirname + "/index.html");
});


server.listen(PORT, function () {
    console.log("server is running at port:"+PORT);

})
