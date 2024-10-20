import { ClientSocket } from "./ClientSocket.js";

export class ClientLogin{

     
    constructor(){

        this.passwordModal = document.getElementById("password-modal");
        this.passwordInput = document.getElementById("password-input");
        this.usernameInput = document.getElementById("username-input");
        this.submitPasswordButton = document.getElementById("submit-password");
        this.mainContent = document.getElementById("main-content");

        // Crea un socket temporal para el login

        this.socket = io();
     

        // Inicializa el login

        this.initialize();
    }

    initialize(){

      

        
        this.submitPasswordButton.addEventListener("click", () => {
            const username = this.usernameInput.value;
            const password = this.passwordInput.value;

            // Emite el Socket con el password

            this.socket.emit("login", password);
            
              
            this.socket.on("login", (login) => {
              if (login) {

                // Desconecta el Socket temporal 
                // y crea un nuevo Socket con el username y password

                this.socket.disconnect();
                

                const nuevoSocket = new ClientSocket();
                nuevoSocket.socket.emit("username", username);

                

                this.passwordModal.style.display = "none";
                this.mainContent.style.display = "initial";
               
              } else {
                alert("Incorrect password.");
              }
            });
          
          });
        
    }

 
    }


