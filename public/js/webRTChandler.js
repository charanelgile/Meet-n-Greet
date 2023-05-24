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

// Sending Appropriate Response to Video Call or Chat Request
export const handlePreOfferResponse = (data) => {
  const { preOfferResponse } = data;

  ui.closeDialog();

  if (preOfferResponse === constants.preOfferResponse.USER_NOT_FOUND) {
    ui.showResponseDialogue(preOfferResponse);
    // User Not Found Dialog Box
  }

  if (preOfferResponse === constants.preOfferResponse.REQUEST_UNAVAILABLE) {
    ui.showResponseDialogue(preOfferResponse);
    // User Busy Dialog Box
  }

  if (preOfferResponse === constants.preOfferResponse.REQUEST_REJECTED) {
    ui.showResponseDialogue(preOfferResponse);
    // Request Rejected Dialog Box
  }

  if (preOfferResponse === constants.preOfferResponse.REQUEST_ACCEPTED) {
    ui.showControls(connectedUserDetails.callType);
    // Proceed to WebRTC Offer, redirect to Chat or Video Call UI
  }
};

// Accept Call
const acceptCallHandler = () => {
  console.log("Request accepted");
  sendPreOfferResponse(constants.preOfferResponse.REQUEST_ACCEPTED);
  ui.showControls(connectedUserDetails.callType);
};
// Reject Call
const rejectCallHandler = () => {
  console.log("Request rejected");
  sendPreOfferResponse();
  sendPreOfferResponse(constants.preOfferResponse.REQUEST_REJECTED);
};
// Cancel Call
const cancelCallHandler = () => {
  console.log("Request cancelled");
};

// Response Handler
const sendPreOfferResponse = (preOfferResponse) => {
  // "connectedUserDetails" is declared above using let, therefore no value will be passed to "data.callerSocketId"
  const data = {
    callerSocketId: connectedUserDetails.socketId,
    preOfferResponse,
  };

  ui.closeDialog();
  wss.sendPreOfferResponse(data);
};
