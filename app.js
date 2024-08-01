const express = require("express");
const app = express();
const http = require("http");
const path = require("path");

const socket = require("socket.io");

const server = http.createServer(app);

const io = socket(server);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection',function(socket) {
    socket.on("send-location",function(data) {
        io.emit("location-received", {id:socket.id, ...data});
        console.log("Location Received: ", data);
    })
    
    socket.on("disconnect", function() {
        io.emit("user-disconnected", socket.id);  // Notify all connected clients that a user disconnected.  // Emits an event to all connected clients named 'user-disconnected'.  // The client that disconnected is identified by the socket.id property.  // This allows us to remove the disconnected client from the clients list in our client-side code.  // The client-side code will listen for this event and update its client list accordingly.  // This is a simple
        console.log("A user disconnected");
    })
    console.log("A user connected");
})

app.get("/", (req, res) => {
  res.render('index');
});
const port = process.env.PORT || 3000;
server.listen(port);
