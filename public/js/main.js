const socket = io("/");

// For the client-side, "socket" is used
socket.on("connect", () => {
  // Prints to the Chrome Dev Tool Console
  console.log(
    `\nSuccessfully connected to Socket.IO Server\nSocket ID: ${socket.id}`
  );
});
