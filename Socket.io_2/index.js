var express = require("express");
var app = express();
var server = require("http").Server(app);
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
server.listen(3000);

var io = require("socket.io")(server);

io.on("connection", function (socket) {
    socket.on("Client-send-color", function (data) {
        io.sockets.emit("Server-send-color", data);
    })

    socket.on("Client-send-num", function(data){
        var sum = data.num1 + data.num2
        socket.broadcast.emit("Server-send-sum", sum);
    })
})

app.get("/", function (req, res) {
    res.render("home");
})