
import { ChatHandler } from "./ChatHandler.js";
export class ClientSocket {
    
    constructor(credentials) {

        this.socket = io({
            auth: {
                username: credentials.username,
                password: credentials.password
            }
        });
        
        this.socket = io();
        this.ChatHandler = new ChatHandler();
        this.initialize();
    }

    initialize() {

        this.socket.on("files", (files) => {
            chatPrint("Files stored in the server: " + files, 'orange');
        });
        
        this.socket.on("messageConnected", (message) => {
            let messages = client.messagesDiv.childNodes;
            if (messages.length > client.maxMessages) {
                client.messagesDiv.innerHTML = "";
            }
            chatPrint(message, "special");
        });
        
        this.socket.on("message", (message) => {
            let messages = client.messagesDiv.childNodes;
            if (messages.length > client.maxMessages) {
                client.messagesDiv.innerHTML = "";
            }
            chatPrint(message);
        });
        
        this.socket.on("fileUpload", (message) => {
            let messages = client.messagesDiv.childNodes;
            if (messages.length > client.maxMessages) {
                client.messagesDiv.innerHTML = "";
            }
            chatPrint(message, '#05fc1d');
        });
        
        this.socket.on("clients", (currentClients) => {
            client.clientsConnected.innerHTML = currentClients;
        });

    }

}