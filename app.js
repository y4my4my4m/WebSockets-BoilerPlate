var express = require('express');
var app = express();
var PORT = 8080;
var http = require('http').createServer(app);

var io = require("socket.io")(http, {
    transports: ['polling', 'websocket']
});

io.on('connection', (client) => {
    console.log('client connected, transport during handshake:', client.handshake.query.transport);

    client.on('join', (nickName) => {
        console.log("user - ", nickName, "joined");
        client.nickName = nickName;
    });

    client.on("upgrade_fail", () => {
        console.log(`socket.id: ${client.id} failed to upgrade to websocket`);
    })

    client.on("upgrade_success", () => {
        console.log(`socket.id: ${client.id} upgraded to websocket`);
    })

    client.on('messages', (data) => {
        client.broadcast.emit('messages', data);
    });

    client.on('disconnect', (reason) => {
        console.log("user -" + client.nickName + " left the chat");
        client.broadcast.emit('removechatter', client.nickName);
        // console.log("disconnect reason:", reason);
    });

    client.on('ping', (ping) => {
        console.log("clientping: ", ping);
    });
    client.on('pong', (pong) => {
        console.log("clientpong: ", pong);
    });
});



app.use(express.static('public'));
app.use(express.static('src'));
app.get('/', (req, res) => {

    res.sendFile(__dirname + "/index.html");
});


http.listen(PORT, function () {
    console.log("server is running at port:" + PORT);
})