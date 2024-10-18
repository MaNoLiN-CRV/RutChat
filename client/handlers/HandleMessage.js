export function sendMessage() {
  const message = messageInput.value;
  if (message && !message.includes("/")) {
    socket.emit("message", message);
    messageInput.value = "";
  } else {
    filterCommand(message);
  }
}