import { ClientLogin } from './ClientLogin.js';





class ChatClient {
    constructor() {

        // Iniciar con el login
        this.login = new ClientLogin();
        
    }
}

// Wait for the document
document.addEventListener("DOMContentLoaded", () => {
    new ChatClient();
});
