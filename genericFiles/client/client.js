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
function chatPrint(text, options) {
  let newMessage;
  
  // Si options es un string y es "special", manejamos el caso especial
  if (options === "special") {
    newMessage = document.createElement("h");
    newMessage.textContent = text;
    newMessage.style.color = "blue"; 
    messagesDiv.appendChild(newMessage);
  } 
  // Si es un string y no es "special", es un puto jodido bloste color
  else if (typeof options === "string") {
    newMessage.textContent = text;
    messagesDiv.appendChild(newMessage).style.color = options;
    messagesDiv.appendChild(newMessage);
  } else if (options == null){
    newMessage = document.createElement("p");
    newMessage.textContent = text;
    messagesDiv.appendChild(newMessage);
  }

  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Mantiene el scroll en la parte inferior BLOSTEJAJA
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

      
      case command.startsWith("/changeBloste"): {

        const theme = command.split("/changeBloste ")[1];
        handleBlosteChange(theme);

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

socket.on("messageConnected", (message) => {
 
  let messages = messagesDiv.childNodes;
  if (messages.length > maxMessages) {
    messagesDiv.innerHTML = "";
  }

  chatPrint(message, "special");
});

// 

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


  // Funcion para cambiar el tema

  function handleBlosteChange(theme) {

    // Removemos el /# del inicio del comando para obtener solo el nombre del tema
    const themeName = theme.replace('/#', '');
    
    switch (themeName) {
        case "sea": {
            document.documentElement.setAttribute('data-theme', 'sea');
            chatPrint("Tema cambiado a Sea Bloste");
            break;
        }
        case "bloste": {
            document.documentElement.setAttribute('data-theme', 'bloste');
            chatPrint("Tema cambiado a Bloste");
            break;
        }
        case "nordic": {
            document.documentElement.setAttribute('data-theme', 'nordic');
            chatPrint("Tema cambiado a Nordic");
            break;
        }
        default:
            chatPrint("¿Qué cojonazos? No existe ese tema");
            break;
    }

  }



  