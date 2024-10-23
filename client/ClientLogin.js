import { ClientSocket } from "./ClientSocket.js";

export class ClientLogin {
  constructor() {
    this.passwordModal = document.getElementById("password-modal");
    this.passwordInput = document.getElementById("password-input");
    this.usernameInput = document.getElementById("username-input");
    this.submitPasswordButton = document.getElementById("submit-password");
    this.mainContent = document.getElementById("main-content");

    // Inicializa el login

    this.initialize();
  }

  initialize() {
    this.submitPasswordButton.addEventListener("click", async () => {
      const username = this.usernameInput.value;
      const password = this.passwordInput.value;

      fetch(window.location.href + "login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: password }),
      })
        .then((res) => {
          return res.json();
        }, this.connectionLost)
        .then((data) => {
          // SOLO CREAMOS EL SOCKET SI HEMOS PUESTO EL BLOSTE CORRECTO
          if (data.signed) {
            this.ClientSocket = new ClientSocket(username);
            this.passwordModal.style.display = "none";
            this.mainContent.style.display = "initial";
          } else {
            alert("Incorrect password.");
          }
        });
    });
  }

  connectionLost() {
    alert("ERROR, CONNECTION LOST");
  }
}
