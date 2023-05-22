import * as store from "./store.js";
import * as wss from "./wss.js";

// Establish connection to Socket.IO Server
const socket = io("/");

// Pass connection to registerSocketEvents() from "./wss.js"
wss.registerSocketEvents(socket);
