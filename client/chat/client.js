import {ClientSocket} from './ClientSocket.js'


class ChatClient {
    constructor() {
        this.ClientSocket = new ClientSocket("bloste");
        }
        
    }


// Wait for the document
document.addEventListener("DOMContentLoaded", () => {
    new ChatClient();
});
