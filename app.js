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

  // console.log("\nconnectedUsers:", connectedUsers);

  // Listen for "pre-offer" event from the Client
  socket.on("pre-offer", (data) => {
    console.log("\nPre-offer requested...");
    const { callType, calleePersonalCode } = data;

    // Search other user via their Personal Code, if found ...
    const otherConnectedUser = connectedUsers.find(
      (socketID) => socketID === calleePersonalCode
    );

    console.log(otherConnectedUser);

    if (otherConnectedUser) {
      const data = {
        callerSocketID: socket.id,
        callType,
      };

      // ... emit "pre-offer" event to the Client
      io.to(calleePersonalCode).emit("pre-offer", data);
    }
  });

  socket.on("disconnect", () => {
    console.log(`\nUser "${socket.id}" disconnected`);

    const newConnectedUsers = connectedUsers.filter((userSocketID) => {
      userSocketID !== socket.id;
    });

    connectedUsers = newConnectedUsers;

    // console.log("\nconnectedUsers:", connectedUsers);
    // console.log("newConnectedUsers", newConnectedUsers);
  });
});

server.listen(PORT, () => {
  console.log(`\nExpress Server listening on Port ${PORT}`);
});
