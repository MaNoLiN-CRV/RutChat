import { ClientLogin } from './ClientLogin.js';
import { ClientSocket } from './ClientSocket.js';

class ChatClient {
    constructor() {
        // Iniciar con el login
        this.login = new ClientLogin();
        
        // Configurar callback para cuando el login sea exitoso
        this.login.onSuccess(() => {
            alert("POLLAS");
            // Inicializar el socket y chat solo después del login exitoso
            this.clientSocket = new ClientSocket();
        });
    }
}