import * as store from "./store.js";
import * as ui from "./ui.js";

export const registerSocketEvents = (socket) => {
  // For the client-side, "socket" is used
  socket.on("connect", () => {
    // Prints to the Chrome Dev Tool Console
    console.log(`\nSuccessfully connected to Socket.IO Server...`);

    // Store the Socket ID to the State Variable
    store.setSocketId(socket.id);

    // Assign the Socket ID as the Personal Code
    ui.updatePersonalCode(socket.id);
  });
};
