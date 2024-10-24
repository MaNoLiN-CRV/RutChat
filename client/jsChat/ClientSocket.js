import { ChatHandler } from "./ChatHandler.js";

export class ClientSocket {
    constructor(username) {
        this.socket = io();
        this.socket.emit("username", username);
        this.chatHandler = new ChatHandler(this.socket);
        this.initialize();
    }

    initialize() {

        this.socket.on("files", (files) => {
            this.chatHandler.chatPrint("Files stored in the server: " + files, 'orange');
        });
        
        this.socket.on("messageConnected", (message) => {
            let messages = this.chatHandler.messagesDiv.childNodes;
            if (messages.length > this.chatHandler.maxMessages) {
               this.chatHandler.messagesDiv.innerHTML = "";
            }
            this.chatHandler.chatPrint(message, "special");
        });
        
        this.socket.on("message", (message) => {
            let messages = this.chatHandler.messagesDiv.childNodes;
            if (messages.length > this.chatHandler.maxMessages) {
                this.chatHandler.messagesDiv.innerHTML = "";
            }
            this.chatHandler.chatPrint(message);
        });
        
        this.socket.on("fileUpload", (message) => {
            let messages = this.chatHandler.messagesDiv.childNodes;
            if (messages.length > this.chatHandler.maxMessages) {
                this.chatHandler.messagesDiv.innerHTML = "";
            }
            this.chatHandler.chatPrint(message, '#05fc1d');
        });
        
        this.socket.on("clients", (currentClients) => {
            this.chatHandler.clientsConnected.innerHTML = currentClients;
        });

    }

}