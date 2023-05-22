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
    callType === constants.callType.CHAT_PERSONAL_CODE ? "Chat" : "Video";

  const incomingCallDialogue = elements.getIncomingCallDialogue();
};
