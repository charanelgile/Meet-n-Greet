import * as store from "./store.js";
import * as ui from "./ui.js";
import * as webRTChandler from "./webRTChandler.js";

let socketIO = null;

export const registerSocketEvents = (socket) => {
  socketIO = socket;

  // For the client-side, "socket" is used
  socket.on("connect", () => {
    socketIO = socket;

    // Prints to the Chrome Dev Tool Console
    console.log(`\nSuccessfully connected to Socket.IO Server...`);
    // Store the Socket ID to the State Variable
    store.setSocketId(socket.id);
    // Assign the Socket ID as the Personal Code
    ui.updatePersonalCode(socket.id);
  });

  // Listen back for "pre-offer" event from the Server
  socket.on("pre-offer", (data) => {
    webRTChandler.handlePreOffer(data);
  });
};

// Emit "pre-offer" event to the Server
export const sendPreOffer = (data) => {
  console.log('\nEmitting "pre-offer" event...');
  socketIO.emit("pre-offer", data);
};
