const express = require("express");
const http = require("http");

// Defining the Port and Creating the Express Server
const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

let connectedUsers = [];

// For the server-side, "io" is used
io.on("connection", (socket) => {
  connectedUsers.push(socket.id);

  console.log("\nconnectedUsers:", connectedUsers);

  socket.on("disconnect", () => {
    console.log(`\nUser "${socket.id}" disconnected`);

    const newConnectedUsers = connectedUsers.filter((userSocketID) => {
      userSocketID !== socket.id;
    });

    connectedUsers = newConnectedUsers;

    console.log("\nconnectedUsers:", connectedUsers);
    console.log("newConnectedUsers", newConnectedUsers);
  });
});

server.listen(PORT, () => {
  console.log(`\nExpress Server listening on Port ${PORT}`);
});
