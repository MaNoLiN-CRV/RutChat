const socket = io();
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const clientsConnected = document.getElementById("clientsConnected");
const maxMessages = 100;
const helpOptions = "/help | /download file | /files | /put on | /put off | /clear |\n /styles ";
const styles = "/#discret | /#normal | /#sea" ;

document.addEventListener("DOMContentLoaded", () => {
  
  const passwordModal = document.getElementById("password-modal");
  const passwordInput = document.getElementById("password-input");
  const usernameInput = document.getElementById("username-input");
  const submitPasswordButton = document.getElementById("submit-password");
  const mainContent = document.getElementById("main-content");
  
  
  submitPasswordButton.addEventListener("click", () => {
    const username = usernameInput.value;
    const password = passwordInput.value;
    socket.emit("login", password);
    socket.emit("username", username);
      
    socket.on("login", (login) => {
      if (login) {
        passwordModal.style.display = "none";
        mainContent.style.display = "initial";
      } else {
        alert("Incorrect password.");
      }
    });

  });
  
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
        document.getElementById("theme").href = "../styles/discret.css";
        break;
      }
      case "/#normal": {
        document.getElementById("theme").href = "../styles/normal.css";
        break;
      };
      case "/#sea": {
        document.getElementById("theme").href = "../styles/sea.css";
        break;
      }
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
