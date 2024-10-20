
import { CommandHandler } from "./CommandHandler.js";

export class ChatHandler {
    constructor(socket) {
        
        this.socket = socket;
        this.messagesDiv = document.getElementById('messages');
        this.clientsConnected = document.getElementById('clientsConnected');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');

        this.CommandHandler = new CommandHandler(socket, this);
    }

    chatPrint(text, options) {
        let newMessage;
        // Si options es un string y es "specialblost", manejamos el caso especial
        if (options === "special") {
          newMessage = document.createElement("h");
          newMessage.textContent = text;
          newMessage.style.color = "blue"; 
          messagesDiv.appendChild(newMessage);
        } 
        // Si es un string y no es "special", es un puto jodido bloste color bloste blostiroide
        else if (typeof options != null) {
          newMessage = document.createElement("p");
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

      

      sendMessage(){
        const message = messageInput.value;
         if (message && !message.includes("/")) {
          socket.emit("message", message);
          messageInput.value = "";
         } else {
         filterCommand(message);
         }

      }

      
        
}
