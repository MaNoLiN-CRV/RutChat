import {ClientSocket} from './ClientSocket.js'
import Login from '../login/login.js';

export default class ChatClient {
    constructor() {
        this.ClientSocket = new ClientSocket(Login.username);
        }
        
    }


// Wait for the document
document.addEventListener("DOMContentLoaded", () => {
    new ChatClient();
});
