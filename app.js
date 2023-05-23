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

  // Listen for "pre-offer" event from the Client
  socket.on("pre-offer", (data) => {
    const { callType, calleePersonalCode } = data;
    callType === "VIDEO_PERSONAL_CODE" || callType === "VIDEO_STRANGER"
      ? console.log("\nVideo Call request sent...")
      : console.log("\nChat request sent...");

    // Search other user via their Personal Code, if found ...
    const otherConnectedUser = connectedUsers.find(
      (socketID) => socketID === calleePersonalCode
    );

    console.log(`Attempting to connect to User: ${otherConnectedUser}`);

    if (otherConnectedUser) {
      const data = {
        callerSocketID: socket.id,
        callType,
      };

      // ... emit "pre-offer" event to the Client
      io.to(calleePersonalCode).emit("pre-offer", data);
    } else {
      const data = {
        preOfferResponse: "USER_NOT_FOUND",
      };

      io.to(socket.id).emit("pre-offer-response", data);
    }
  });

  // Listen for "pre-offer-response" event from the Client
  socket.on("pre-offer-response", (data) => {
    // As a workaround, get the value from "socket.id" and pass it to "data.callerSocketId"
    data.callerSocketId = socket.id;

    console.log("\nResponse received:");
    console.log(data);

    // Search other user via their Personal Code, if found ...
    const otherConnectedUser = connectedUsers.find(
      (socketID) => socketID === data.callerSocketId
    );

    if (otherConnectedUser) {
      // ... emit "pre-offer-response" event to the Client
      io.to(data.callerSocketId).emit("pre-offer-response", data);
    }
  });

  // Listen for "disconnect" event from the Client
  socket.on("disconnect", () => {
    console.log(`\nUser "${socket.id}" disconnected`);

    // Cleanup Array of Connected Users. "userSocketID" will always be equal to "socket.id"
    // Therefore, nothing will be returned...
    const newConnectedUsers = connectedUsers.filter(
      (userSocketID) => userSocketID !== socket.id
    );
    // ... So we are actually assigning an empty array to "connectedUsers", indirectly cleaning up the variable
    connectedUsers = newConnectedUsers;
  });
});

server.listen(PORT, () => {
  console.log(`\n[ Express Server listening on Port ${PORT} ]`);
});
