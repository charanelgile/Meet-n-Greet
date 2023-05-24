import * as ui from "./ui.js";
import * as wss from "./wss.js";
import * as constants from "./constants.js";
import * as store from "./store.js";

let connectedUserDetails;

const defaultConstraints = {
  audio: true,
  video: true,
};

let peerConnection;

const configuration = {
  iceServers: [
    {
      urls: "stun:stun.1.google.com:13902",
    },
  ],
};

// Preview Local Video
export const getLocalPreview = () => {
  navigator.mediaDevices
    .getUserMedia(defaultConstraints)
    .then((localStream) => {
      ui.updateLocalVideo(localStream);
      store.setLocalStream(localStream);
    })
    .catch((error) => {
      console.log("Unable to access Audio / Video");
      console.log(error);
    });
};

// Create a WebRTC Peer Connection
const createPeerConnection = () => {
  peerConnection = new RTCPeerConnection(configuration);

  // Event Listener when an ICE Candidate is received
  peerConnection.onicecandidate = (event) => {
    console.log("Getting ICE Candidates from the STUN Server");
    if (event.candidate) {
      // Send ICE Candidates to the other user
    }
  };

  // Event Listener when Connection State has changed
  peerConnection.onconnectionstatechange = (event) => {
    if (peerConnection.connectionState === "connected") {
      console.log("Successfully connected with the other user");
    }
  };

  // Receive Tracks (Remote Video Stream) when connection is established
  const remoteStream = new MediaStream();
  store.setRemoteStream(remoteStream);
  ui.updateRemoteVideo(remoteStream);

  // Event Listener when Tracks are received
  peerConnection.ontrack = (event) => {
    remoteStream.addTrack(event.track);
  };

  // Add Tracks to the Peer Connection
  if (
    connectedUserDetails.callType === constants.callType.VIDEO_PERSONAL_CODE
  ) {
    const localStream = store.getState().localStream;
    // Send local stream to the other user
    for (const track of localStream.getTracks()) {
      peerConnection.addTrack(track, localStream);
    }
  }
};

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

  createPeerConnection();

  sendPreOfferResponse(constants.preOfferResponse.REQUEST_ACCEPTED);
  ui.showControls(connectedUserDetails.callType);
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
  // "connectedUserDetails" is declared above using let, therefore no value will be passed to "data.callerSocketId"
  const data = {
    callerSocketId: connectedUserDetails.socketId,
    preOfferResponse,
  };

  ui.closeDialog();
  wss.sendPreOfferResponse(data);
};

// Sending Appropriate Response to Video Call or Chat Request
export const handlePreOfferResponse = (data) => {
  const { preOfferResponse } = data;

  ui.closeDialog();

  if (preOfferResponse === constants.preOfferResponse.USER_NOT_FOUND) {
    // User Not Found Dialog Box
    ui.showResponseDialogue(preOfferResponse);
  }

  if (preOfferResponse === constants.preOfferResponse.REQUEST_UNAVAILABLE) {
    // User Busy Dialog Box
    ui.showResponseDialogue(preOfferResponse);
  }

  if (preOfferResponse === constants.preOfferResponse.REQUEST_REJECTED) {
    // Request Rejected Dialog Box
    ui.showResponseDialogue(preOfferResponse);
  }

  if (preOfferResponse === constants.preOfferResponse.REQUEST_ACCEPTED) {
    // Proceed to WebRTC Offer and load to Chat or Video Call UI
    ui.showControls(connectedUserDetails.callType);

    createPeerConnection();
    sendWebRTCOffer();
  }
};

// Send WebRTC Offer
const sendWebRTCOffer = async () => {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  wss.sendWebRTCSignalingData({
    recipientSocketID: connectedUserDetails.socketId,
    type: constants.webRTCSignal.OFFER,
    offer: offer,
  });
};

// Handle WebRTC Offer
export const handleWebRTCOffer = async (data) => {
  console.log("WebRTC Offer received...");
  await peerConnection.setRemoteDescription(data.offer);

  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);

  wss.sendWebRTCSignalingData({
    recipientSocketID: connectedUserDetails.socketId,
    type: constants.webRTCSignal.ANSWER,
    answer: answer,
  });
};

// Handle WebRTC Answer
export const handleWebRTCAnswer = async (data) => {
  console.log("WebRTC Answer sent...");
  await peerConnection.setRemoteDescription(data.answer);
};
