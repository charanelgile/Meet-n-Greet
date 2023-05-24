import * as elements from "./elements.js";
import * as constants from "./constants.js";

// Assign a Personal Code
export const updatePersonalCode = (personalCode) => {
  const personalCodeParagraph = document.getElementById(
    "personal_code_paragraph"
  );

  personalCodeParagraph.innerHTML = personalCode;
};

// Local Video Stream
export const updateLocalVideo = (stream) => {
  const localVideo = document.getElementById("local_video");
  localVideo.srcObject = stream;

  localVideo.addEventListener("loadedmetadata", () => {
    localVideo.play();
  });
};

// Video Call and Chat Connection-related Functions
export const showIncomingCallDialogue = (
  callType,
  acceptCallHandler,
  rejectCallHandler
) => {
  const callTypeInfo =
    callType === constants.callType.CHAT_PERSONAL_CODE ? "Chat" : "Video Call";

  const incomingCallDialogue = elements.getIncomingCallDialogue(
    callTypeInfo,
    acceptCallHandler,
    rejectCallHandler
  );

  const dialog = document.getElementById("dialog");

  // Cleanup any element in the dialog box container div first...
  dialog.querySelectorAll("*").forEach((element) => element.remove());
  // ... before appending a new dialog box
  dialog.appendChild(incomingCallDialogue);
};

export const showCallingDialogue = (cancelCallHandler) => {
  const callingDialogue = elements.getCallingDialogue(cancelCallHandler);

  const dialog = document.getElementById("dialog");

  // Cleanup any element in the dialog box container div first...
  dialog.querySelectorAll("*").forEach((element) => element.remove());
  // ... before appending a new dialog box
  dialog.appendChild(callingDialogue);
};

export const showResponseDialogue = (preOfferResponse) => {
  let responseDialogue = null;

  // User Not Found
  if (preOfferResponse === constants.preOfferResponse.USER_NOT_FOUND) {
    responseDialogue = elements.getResponseDialogue(
      "User Not Found",
      "Please check the Personal Code."
    );
  }
  // User Busy
  if (preOfferResponse === constants.preOfferResponse.REQUEST_UNAVAILABLE) {
    responseDialogue = elements.getResponseDialogue(
      "User Busy",
      "User is currently on a Video Call or Chat. Please try again later."
    );
  }
  // Request Rejected
  if (preOfferResponse === constants.preOfferResponse.REQUEST_REJECTED) {
    responseDialogue = elements.getResponseDialogue(
      "Request Rejected",
      "User has rejected your request."
    );
  }

  if (responseDialogue) {
    const dialog = document.getElementById("dialog");
    dialog.appendChild(responseDialogue);

    setTimeout(() => {
      closeDialog();
    }, [2500]);
  }
};

export const closeDialog = () => {
  const dialog = document.getElementById("dialog");
  dialog.querySelectorAll("*").forEach((element) => element.remove());
};

// Check which Controls to Show - Chat or Video Call
export const showControls = (callType) => {
  if (callType === constants.callType.CHAT_PERSONAL_CODE) {
    showControlsChat();
  }

  if (callType === constants.callType.VIDEO_PERSONAL_CODE) {
    showControlsVideoCall();
  }
};

// Show Controls - Chat
const showControlsChat = () => {
  const newMessageInput = document.getElementById("new_message");
  const endChatButtonContainer = document.getElementById(
    "finish_chat_button_container"
  );

  showElement(newMessageInput);
  showElement(endChatButtonContainer);

  disableDashboard();
};

// Show Controls - Video Call
const showControlsVideoCall = () => {
  const newMessageInput = document.getElementById("new_message");
  const videoControls = document.getElementById("call_buttons");
  const placeholder = document.getElementById("video_placeholder");
  const remoteVideo = document.getElementById("remote_video");

  showElement(newMessageInput);
  showElement(videoControls);
  hideElement(placeholder);
  showElement(remoteVideo);

  disableDashboard();
};

// UI Helper Functions
const enableDashboard = () => {
  // Hide the dashboard blocker by adding the class "display_none", therefore enabling the dashboard
  const dashboardBlocker = document.getElementById("dashboard_blur");
  if (!dashboardBlocker.classList.contains("display_none")) {
    dashboardBlocker.classList.add("display_none");
  }
};

const disableDashboard = () => {
  // Show the dashboard blocker by removing the class "display_none", therefore disabling the dashboard
  const dashboardBlocker = document.getElementById("dashboard_blur");
  if (dashboardBlocker.classList.contains("display_none")) {
    dashboardBlocker.classList.remove("display_none");
  }
};

const hideElement = (element) => {
  // Hide an element by adding the class "display_none"
  if (!element.classList.contains("display_none")) {
    element.classList.add("display_none");
  }
};

const showElement = (element) => {
  // Show an element by removing the class "display_none"
  if (element.classList.contains("display_none")) {
    element.classList.remove("display_none");
  }
};
