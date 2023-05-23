import * as ui from "./ui.js";
import * as wss from "./wss.js";
import * as constants from "./constants.js";

let connectedUserDetails;

// Sending Video Call or Chat Request
export const sendPreOffer = (callType, calleePersonalCode) => {
  connectedUserDetails = {
    socketId: calleePersonalCode,
    callType,
  };

  if (
    callType === constants.callType.CHAT_PERSONAL_CODE ||
    callType === constants.callType.VIDEO_PERSONAL_CODE
  ) {
    const data = {
      callType,
      calleePersonalCode,
    };

    ui.showCallingDialogue(cancelCallHandler);

    wss.sendPreOffer(data);
  }
};

// Receiving Video Call or Chat Request
export const handlePreOffer = (data) => {
  const { callType, callerSocketId } = data;

  connectedUserDetails = {
    socketId: callerSocketId,
    callType,
  };

  if (
    callType === constants.callType.CHAT_PERSONAL_CODE ||
    callType === constants.callType.VIDEO_PERSONAL_CODE
  ) {
    ui.showIncomingCallDialogue(callType, acceptCallHandler, rejectCallHandler);
  }
};

// Accept Call
const acceptCallHandler = () => {
  console.log("Request accepted");
  sendPreOfferResponse(constants.preOfferResponse.REQUEST_ACCEPTED);
};
// Reject Call
const rejectCallHandler = () => {
  console.log("Request rejected");
  sendPreOfferResponse(constants.preOfferResponse.REQUEST_REJECTED);
};
// Cancel Call
const cancelCallHandler = () => {
  console.log("Request cancelled");
};

// Response Handler
const sendPreOfferResponse = (preOfferResponse) => {
  const data = {
    callerSocketId: connectedUserDetails.socketId,
    preOfferResponse,
  };

  wss.sendPreOfferResponse(data);
};
