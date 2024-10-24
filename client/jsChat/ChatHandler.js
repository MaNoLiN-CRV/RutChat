
import { CommandHandler } from "./CommandHandler.js";

export class ChatHandler {
    constructor(socket) {
        
        this.socket = socket;
        this.messagesDiv = document.getElementById('messages');
        this.clientsConnected = document.getElementById('clientsConnected');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');

        // Crea un manejador de comandos
        this.commandHandler = new CommandHandler(socket, this);

        // Crea un listener para el boton de enviar
        this.sendButton.addEventListener('click', () => this.sendMessage());
        // Crea listener para enter 
        this.messageInput.addEventListener('keypress', (e) => {
          if (e.key === "Enter") {
            this.sendMessage();
          }
        });


    }

    chatPrint(text, options) {

        let newMessage;
        // Si options es un string y es "specialblost", manejamos el caso especial
        if (options === "special") {
          newMessage = document.createElement("h");
          newMessage.textContent = text;
          newMessage.style.color = "blue"; 
          this.messagesDiv.appendChild(newMessage);
        } 
        // Si es un string y no es "special", es un puto jodido bloste color bloste blostiroide
        else if (typeof options != null) {
          newMessage = document.createElement("p");
          newMessage.textContent = text;
          this.messagesDiv.appendChild(newMessage).style.color = options;
          this.messagesDiv.appendChild(newMessage);
        } else if (options == null){
          newMessage = document.createElement("p");
          newMessage.textContent = text;
          this.messagesDiv.appendChild(newMessage);
        }
        this.messagesDiv.scrollTop = this.messagesDiv.scrollHeight; // Mantiene el scroll en la parte inferior BLOSTEJAJA
      }

      // Envia el mensaje al servidor
      sendMessage(){
        const message = this.messageInput.value;
         if (message && !message.includes("/")) {
          this.socket.emit("message", message);
          this.messageInput.value = "";
         } else {
         // DEPRECATED this.commandHandler.handleCommand(message);
          this.commandHandler.commandArgumenter(message);
         }

      }


      

      
        
}
