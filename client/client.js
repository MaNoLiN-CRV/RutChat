import { sendMessage } from "./handlers/HandleMessage.js";
import './events/SocketsClient.js';

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

sendButton.addEventListener("click", () => {
  sendMessage();
});


// También enviar mensaje al presionar Enter
document
  .getElementById("messageInput")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      document.getElementById("sendButton").click();
    }
  });


  // Funcion para cambiar el tema

  

  



  