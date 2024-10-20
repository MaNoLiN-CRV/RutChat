

export class CommandHandler {

  constructor(socket, chatHandler) {
    this.socket = socket;
    this.chatHandler = chatHandler;
  }
  
  handleCommand(command) {
    switch (command) {
      case "/help": {
        this.chatHandler.chatPrint(helpOptions,'#16f4fc');
        break;
      };
      case "/files": {
        this.socket.emit("files");
        break;
      };
      case "/put on": {
        const fileUploader = document.getElementById("file-up");
        fileUploader.style.display = "initial";
        break;
      };
      case "/put off": {
        const fileUploader = document.getElementById("file-up");
        fileUploader.style.display = "none";
        break;
      }
      case "/clear":{
        this.chatHandler.messagesDiv.innerHTML = "";
        break;
      };
      case "/styles":{
        this.chatHandler.chatPrint(styles, 'white');
        break;
      };

      case command.includes("/download"):{
        let filename = command.split("/download ")[1];
        let downloader = document.getElementById("downloadLink");
        downloader.href = '/uploads/' + filename;
        downloader.click();
    
        this.chatHandler.chatPrint("File " + filename + " downloaded." , "lightgreen")
      }

      case command.startsWith("/changeBloste"): {
        const theme = command.split("/changeBloste ")[1];
        handleBlosteChange(theme);
      };
      
      default:
        this.chatHandler.chatPrint("No command found.");
        break; 
    }

  this.chatHandler.messageInput.value = "";

}

handleBlosteChange(theme) {

  // Removemos el /# del inicio del comando para obtener solo el nombre del tema
  const themeName = theme.replace('/#', '');
  
  switch (themeName) {
      case "sea": {
          document.documentElement.setAttribute('data-theme', 'sea');
          this.chatHandler.chatPrint("Tema cambiado a Sea Bloste");
          break;
      }
      case "bloste": {
          document.documentElement.setAttribute('data-theme', 'bloste');
          this.chatHandler.chatPrint("Tema cambiado a Bloste");
          break;
      }
      case "nordic": {
          document.documentElement.setAttribute('data-theme', 'nordic');
          this.chatHandler.chatPrint("Tema cambiado a Nordic");
          break;
      }
      default:
        this.chatHandler.chatPrint("¿Qué cojonazos? No existe ese tema");
          break;
  }}

}

 

    
