const socket = io();
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const clientsConnected = document.getElementById("clientsConnected");
const maxMessages = 100;
const helpOptions = "/help | /download file | /files | /put on | /put off | /clear |\n /styles ";
const styles = "/#discret | /#normal " ;

document.addEventListener("DOMContentLoaded", () => {
  let username = "-";
  password = prompt("Password: ");
  socket.emit("login", password);
  while (username.trim() === "" || username === "-") {
    username = prompt("Username: ");
  }
  socket.emit("username", username);
});

// Prints information in the chat //////
function chatPrint(text) {
  const newMessage = document.createElement("div");
  newMessage.textContent = text;
  messagesDiv.appendChild(newMessage);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
function chatPrint(text,color) {
  const newMessage = document.createElement("div");
  newMessage.textContent = text;
  messagesDiv.appendChild(newMessage).style.color = color;
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
//////////////////////////////////////

function filterCommand(command) {
  if (command.includes("/download")) {
    let filename = command.split("/download ")[1];
    let downloader = document.getElementById("downloadLink");
    downloader.href = '/uploads/' + filename;
    downloader.click();
    chatPrint("File " + filename + " downloaded." , "lightgreen")
  } else {
    switch (command) {
      case "/help": {
        chatPrint(helpOptions,'#16f4fc');
        break;
      };
      case "/files": {
        socket.emit("files");
        break;
      };
      case "/put on": {
        const fileUploader = document.getElementById("file-up");
        fileUploader.style.display = "initial";
        break;
      };
      case "/put off": {
        const fileUploader = document.getElementById("file-up");
        fileUploader.style.display = "none";
        break;
      }
      case "/clear":{
        messagesDiv.innerHTML = "";
        break;
      };
      case "/styles":{
        chatPrint(styles, 'white');
        break;
      };
      case "/#discret": {
        document.getElementById("theme").href = "discret.css";
        break;
      }
      case "/#normal": {
        document.getElementById("theme").href = "normal.css";
        break;
      };
      default:
        chatPrint("No commands found.");
        break;
    }
  }
  messageInput.value = "";
}

// Enviar mensaje al servidor
function sendMessage() {
  const message = messageInput.value;
  if (message && !message.includes("/")) {
    socket.emit("message", message);
    messageInput.value = "";
  } else {
    filterCommand(message);
  }
}

sendButton.addEventListener("click", () => {
  sendMessage();
});

// FILE ENUMERATION EVENT
socket.on("files", (files) => {
  chatPrint("Files stored in the server: " + files , 'orange');
});

socket.on("message", (message) => {
  let messages = messagesDiv.childNodes;
  if (messages.length > maxMessages) {
    messagesDiv.innerHTML = "";
  }
  chatPrint(message);
});
socket.on("fileUpload", (message) => {
  let messages = messagesDiv.childNodes;
  if (messages.length > maxMessages) {
    messagesDiv.innerHTML = "";
  }
  chatPrint(message,'#05fc1d');
});

socket.on("clients", (currentClients) => {
  clientsConnected.innerHTML = currentClients;
});

// También enviar mensaje al presionar Enter
document
  .getElementById("messageInput")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      document.getElementById("sendButton").click();
    }
  });
