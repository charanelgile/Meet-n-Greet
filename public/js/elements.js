export const getIncomingCallDialogue = (
  callTypeInfo,
  acceptCallHandler,
  rejectCallHandler
) => {
  console.log("\nGetting incoming call dialogue");

  // Create full-page blurred container
  const dialog = document.createElement("div");
  dialog.classList.add("dialog_wrapper");

  // Create dialog box
  const dialogContent = document.createElement("div");
  dialogContent.classList.add("dialog_content");

  // Create a paragraph for the incoming type of request
  const title = document.createElement("paragraph");
  title.classList.add("dialog_title");
  title.innerHTML = `Incoming ${callTypeInfo} Request`;

  // Create avatar image container
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("dialog_image_container");

  // Create avatar image
  const image = document.createElement("img");
  const avatarImagePath = "./utils/images/dialogAvatar.png";
  image.src = avatarImagePath;

  // Create button container
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("dialog_button_container");

  // Create button - Accept Call
  const acceptCallButton = document.createElement("button");
  acceptCallButton.classList.add("dialog_accept_call_button");
  const acceptCallImage = document.createElement("img");
  acceptCallImage.classList.add("dialog_button_image");
  const acceptCallImagePath = "./utils/images/acceptCall.png";
  acceptCallImage.src = acceptCallImagePath;

  // Create button - Reject Call
  const rejectCallButton = document.createElement("button");
  rejectCallButton.classList.add("dialog_reject_call_button");
  const rejectCallImage = document.createElement("img");
  rejectCallImage.classList.add("dialog_button_image");
  const rejectCallImagePath = "./utils/images/rejectCall.png";
  rejectCallImage.src = rejectCallImagePath;

  // ----------------------------------------

  // Append the avatar image to the container
  imageContainer.appendChild(image);

  // Append the button images to the buttons
  acceptCallButton.append(acceptCallImage);
  rejectCallButton.append(rejectCallImage);

  // Append the buttons to the container
  buttonContainer.appendChild(acceptCallButton);
  buttonContainer.appendChild(rejectCallButton);

  // Append the containers to the dialog box
  dialogContent.appendChild(title);
  dialogContent.appendChild(imageContainer);
  dialogContent.appendChild(buttonContainer);

  // Append the dialog box to the blurred container
  dialog.appendChild(dialogContent);

  // Appending of all elements above to the container div for testing purposes
  const dialogHTML = document.getElementById("dialog");
  dialogHTML.appendChild(dialog);
};
