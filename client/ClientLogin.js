export class ClientLogin{

    
    constructor(){
        this.passwordModal = document.getElementById("password-modal");
        this.passwordInput = document.getElementById("password-input");
        this.usernameInput = document.getElementById("username-input");
        this.submitPasswordButton = document.getElementById("submit-password");
        this.mainContent = document.getElementById("main-content");

        this.initialize();
    }

    initialize(){

        this.socket = io({
            autoConnect: true 
        });


        
        submitPasswordButton.addEventListener("click", () => {
            const username = usernameInput.value;
            const password = passwordInput.value;
            socket.emit("login", password);
            socket.emit("username", username);
              
            socket.on("login", (login) => {
              if (login) {
                passwordModal.style.display = "none";
                mainContent.style.display = "initial";
              } else {
                alert("Incorrect password.");
              }
            });
          
          });
        
    }

 
    }


