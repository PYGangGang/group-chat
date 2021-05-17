const { Socket } = require('dgram');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index.ejs");
})

io.on("connection", (socket) => {
    socket.on('username', (user) => {
        socket.username = user;
        io.emit('status', `😀 [${socket.username}] joined !`);
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', `[${socket.username}]: ` + msg);
    });

    socket.on('disconnect', (user) => {
        io.emit('status', `👻 [${socket.username}] lefted !`)
    })
})



server.listen(8000, () => {
    console.log("start at 8000");
})