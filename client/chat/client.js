import {ClientSocket} from './ClientSocket.js'


export default class ChatClient {
    static username = "bloste";
    constructor() {
        this.ClientSocket = new ClientSocket(username);
        }
        
    }


// Wait for the document
document.addEventListener("DOMContentLoaded", () => {
    new ChatClient();
});
