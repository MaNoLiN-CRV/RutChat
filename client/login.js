class login {
  constructor() {
    console.log("INITIALIZED")
    this.signInButton = document.getElementById("signIn");
    this.usernameInput = document.getElementById("username");
    this.passwordInput = document.getElementById("password");
    this.signInButton.addEventListener("click", () => {
        this.sendData();
      });
  }
  /**
   * Sends the login data to the server
   * @param {*} username 
   * @param {*} password 
   */
  async sendData() {
    const username = this.usernameInput.value;
    const password = this.passwordInput.value;
    fetch(window.location.href + "login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            password: password ,
            username: username

        }),
      }).then((res) => {
          return res.json();
        }, this.connectionLost)
        .then((data) => {
          if (data.token != undefined) {
            // SAVES THE TOKEN
            document.cookie = `token=${data.token}`;
            // REDIRECT THE USER TO THE CHAT
            window.location.replace(window.location.origin + "chat/chat.html");
          } else {
            this.passwordInput.value = "";
            this.usernameInput.value = "";
            alert("Incorrect password.");
            
          }
        });

  }
  connectionLost() {
    alert("ERROR, CONNECTION LOST");
  }
}
// INITIALIZES THE JS
document.addEventListener("DOMContentLoaded", () => {
    new login();
});
