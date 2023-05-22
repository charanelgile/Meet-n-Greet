import * as store from "./store.js";
import * as wss from "./wss.js";

// Establish connection to Socket.IO Server
const socket = io("/");

// Pass connection to registerSocketEvents() from "./wss.js"
wss.registerSocketEvents(socket);

// On Button Click, copy User's Personal Code to Clipboard
const personalCodeCopyButton = document.getElementById(
  "personal_code_copy_button"
);
personalCodeCopyButton.addEventListener("click", () => {
  const personalCode = store.getState().socketId;

  navigator.clipboard && navigator.clipboard.writeText(personalCode);
});
