var express = require('express');
var app = express();
var server = require('http').createServer(app);
var PORT = 8080;

var io = require("socket.io")(server, {
    transports: ['polling', 'websocket'],
    upgradeTimeout: 100,
    // allowRequest: (req,callback) => {
    //     console.log(req);
    // }
});


server.on('upgrade', function (req, socket, head) {
    console.log(`UPGRADEEE!!!`);
});
server.on('upgrading', function (req, socket, head) {
    console.log(`UPGRADEEE FAIL!!!`);
});

server.on('ping', (ping) => {
    console.log("serverping: ", ping);
});
server.on('pong', (pong) => {
    console.log("serverpong: ", pong);
});
io.on('ping', (ping) => {
    console.log("ping: ", ping);
});
io.on('pong', (pong) => {
    console.log("pong: ", pong);
});
io.on('upgrade', () => {
    // client.emit('upgrade', client.nickName)
    console.log("!1111!upgrade")
});
io.on('connection', (client) => {
    console.log('client connected, transport:', client.handshake.query.transport);

    client.on('join', (nickName) => {
        console.log("user - ", nickName, "joined");
        client.nickName = nickName;
    });
    client.on('error', (error) => {
        console.log("error:", error);
    });
    client.on('upgrade', () => {
        client.emit('upgrade', client.nickName)
    });

    client.on("connect_error", (err) => {
        // revert to classic upgrade
        // socket.io.opts.transports = ["polling", "websocket"];
        client.emit('messages', err);
        console.log(`CONNECT_ERROR: `, err);
        console.log(`CONNECT_ERROR MSG: `, err.message);
    });
    client.on("reconnect_attempt", (err) => {
        console.log(`reconnect_attempt: `, err);
    });

    client.on("reconnect", (err) => {
        console.log(`reconnect: `, err);
    });
    client.on("reconnect_error", (err) => {
        console.log(`reconnect_error: `, err);
    });
    client.on("reconnect_failed", (err) => {
        console.log(`reconnect_failed: `, err);
    });

    client.on('messages', (data) => {
        client.broadcast.emit('messages', data);
        //saveMessages(data);
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


server.listen(PORT, function () {
    console.log("server is running at port:" + PORT);
})