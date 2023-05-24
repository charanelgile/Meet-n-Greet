import * as store from "./store.js";
import * as wss from "./wss.js";
import * as webRTChandler from "./webRTChandler.js";
import * as constants from "./constants.js";

// Establish connection to Socket.IO Server
const socket = io("/");

// Pass connection to registerSocketEvents() from "./wss.js"
wss.registerSocketEvents(socket);

// Preview Local Video
webRTChandler.getLocalPreview();

// Element References for Event Listeners & Handlers
const personalCodeCopyButton = document.getElementById(
  "personal_code_copy_button" // Copy Personal Code
);
const personalCodeChatButton = document.getElementById(
  "personal_code_chat_button" // Chat via Personal Code
);
const personalCodeVideoButton = document.getElementById(
  "personal_code_video_button" // Video Call via Personal Code
);

// On Button Click, copy User's Personal Code to Clipboard
personalCodeCopyButton.addEventListener("click", () => {
  const personalCode = store.getState().socketId;
  navigator.clipboard && navigator.clipboard.writeText(personalCode);
});

// Chat using Personal Code
personalCodeChatButton.addEventListener("click", () => {
  const callType = constants.callType.CHAT_PERSONAL_CODE;
  const calleePersonalCode = document.getElementById(
    "personal_code_input" // Other User's Personal Code from the Input Box
  ).value;

  webRTChandler.sendPreOffer(callType, calleePersonalCode);
});

// Video Call using Personal Code
personalCodeVideoButton.addEventListener("click", () => {
  const callType = constants.callType.VIDEO_PERSONAL_CODE;
  const calleePersonalCode = document.getElementById(
    "personal_code_input" // Other User's Personal Code from the Input Box
  ).value;

  webRTChandler.sendPreOffer(callType, calleePersonalCode);
});
