import * as store from "./store.js";
import * as ui from "./ui.js";
import * as webRTChandler from "./webRTChandler.js";
import * as constants from "./constants.js";

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

  // Listen back for "pre-offer-response" event from the Server
  socket.on("pre-offer-response", (data) => {
    webRTChandler.handlePreOfferResponse(data);
  });

  // Listen back for "webRTC-signal" event from the Server
  socket.on("webRTC-signal", (data) => {
    switch (data.type) {
      case constants.webRTCSignal.OFFER:
        webRTChandler.handleWebRTCOffer(data);
        break;
      default:
        return;
    }
  });
};

// Emit "pre-offer" event to the Server
export const sendPreOffer = (data) => {
  data.callType === "VIDEO_PERSONAL_CODE" || data.callType === "VIDEO_STRANGER"
    ? console.log("\nVideo Call request sent...")
    : console.log("\nChat request sent...");

  socketIO.emit("pre-offer", data);
};

// Emit "pre-offer-response" event to the Server
export const sendPreOfferResponse = (data) => {
  socketIO.emit("pre-offer-response", data);
};

// Emit "webRTC-signal" event to the Server
export const sendWebRTCSignalingData = (data) => {
  socketIO.emit("webRTC-signal", data);
};
