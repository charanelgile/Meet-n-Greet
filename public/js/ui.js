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
