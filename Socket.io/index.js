var express = require("express");
var app = express();
var server = require("http").Server(app);
server.listen(3000);
var io = require("socket.io")(server);
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", function(req, res){
    res.render("home");
})

io.on("connection", function(socket){
    console.log("Someone is accessing " + socket.id);
    socket.on("disconnect", function(){
        console.log(socket.id + " disconneted");
    })

    socket.on("Client-send-data", function(data){
        console.log(data);
        // io.sockets.emit("Server-send-data", data);
        // socket.emit("Server-send-data", data);

        socket.broadcast.emit("Server-send-data", data);
    })

    
})

