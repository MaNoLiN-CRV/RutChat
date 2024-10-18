import { chatPrint } from "../handlers/HandleChat.js";
import * as client from '../client.js';

// FILE ENUMERATION EVENT
socket.on("files", (files) => {
    chatPrint("Files stored in the server: " + files, 'orange');
});

socket.on("messageConnected", (message) => {
    let messages = client.messagesDiv.childNodes;
    if (messages.length > client.maxMessages) {
        client.messagesDiv.innerHTML = "";
    }
    chatPrint(message, "special");
});

socket.on("message", (message) => {
    let messages = client.messagesDiv.childNodes;
    if (messages.length > client.maxMessages) {
        client.messagesDiv.innerHTML = "";
    }
    chatPrint(message);
});

socket.on("fileUpload", (message) => {
    let messages = client.messagesDiv.childNodes;
    if (messages.length > client.maxMessages) {
        client.messagesDiv.innerHTML = "";
    }
    chatPrint(message, '#05fc1d');
});

socket.on("clients", (currentClients) => {
    client.clientsConnected.innerHTML = currentClients;
});