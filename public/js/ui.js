import * as elements from "./elements.js";
import * as constants from "./constants.js";

export const updatePersonalCode = (personalCode) => {
  const personalCodeParagraph = document.getElementById(
    "personal_code_paragraph"
  );

  personalCodeParagraph.innerHTML = personalCode;
};

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
    }, [4000]);
  }
};

export const closeDialog = () => {
  const dialog = document.getElementById("dialog");
  dialog.querySelectorAll("*").forEach((element) => element.remove());
};
