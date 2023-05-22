let state = {
  socketId: null,
  localStream: null,
  remoteStream: null,
  screenSharingStream: null,
  screenSharingActive: false,
  allowConnectionsFromStrangers: false,
};

// Getter Function
export const getState = () => {
  return state;
};

// Setter Functions
export const setSocketId = (socketId) => {
  state = {
    ...state,
    socketId,
  };

  console.log(state);
};

export const setLocalStream = (localStream) => {
  state = {
    ...state,
    localStream,
  };
};

export const setRemoteStream = (remoteStream) => {
  state = {
    ...state,
    remoteStream,
  };
};

export const setScreenSharingStream = (screenSharingStream) => {
  state = {
    ...state,
    screenSharingStream,
  };
};

export const setScreenSharingActive = (screenSharingActive) => {
  state = {
    ...state,
    screenSharingActive,
  };
};

export const setAllowConnectionsFromStrangers = (
  allowConnectionsFromStrangers
) => {
  state = {
    ...state,
    allowConnectionsFromStrangers,
  };
};
