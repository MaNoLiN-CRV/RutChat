export class CommandHandler {

  

  constructor(socket, chatHandler) {

   

    this.socket = socket;
    this.chatHandler = chatHandler;
  }
  
  commandArgumenter(command){
    const BLOSTE_COMMANDS = "Uso de bloste: /bloste [tema]. Temas: sea, bloste, nordic.";
    const DOWNLOAD_COMMANDS = "Uso de download: /download [nombre del archivo].";
    const PUT_COMMANDS = "Uso de put: /put [on/off].";
    const HELP_OPTIONS = [BLOSTE_COMMANDS, DOWNLOAD_COMMANDS, PUT_COMMANDS];
    // Dividiendo el comando en base y argumentos
    let baseCommand = command.split(" ")[0];
    let argumentsCommand = command.split(" ").slice(1);
    switch (baseCommand) {


        case "/put": {
          if (argumentsCommand[0] === "on") {
            const fileUploader = document.getElementById("file-up");
            fileUploader.style.display = "initial";
          } else if (argumentsCommand[0] === "off") {
            const fileUploader = document.getElementById("file-up");
            fileUploader.style.display = "none";
          } else {
            this.chatHandler.chatPrint(PUT_COMMANDS);
          }
          break;
        }

        case "/bloste": {
            if (argumentsCommand.length === 1 ) {
              this.handleBlosteChange(argumentsCommand[0]);
            } else {
              this.chatHandler.chatPrint(BLOSTE_COMMANDS);
            }
          break;
        }
        case "/download": {
          if (argumentsCommand) {
            this.socket.emit("download", argumentsCommand[0]);
          } else {
            this.chatHandler.chatPrint(DOWNLOAD_COMMANDS);
          }
          break;
        }
        case "/help": {
          // TODO ADD HELP OPTIONS 
          HELP_OPTIONS.forEach((element) => {
            this.chatHandler.chatPrint(element);
          });
          break;
        };
        case "/files": {
          this.socket.emit("files");
          break;
        };
        case "/clear":{
          this.chatHandler.messagesDiv.innerHTML = "";
          break;
        };

        default:
          this.chatHandler.chatPrint("No existe el comando " + baseCommand);
          break;

    }
    this.chatHandler.messageInput.value = "";

  }

  handleBlosteChange(theme) {
    
   // Cambia los temas, por defecto, es Sea 

    switch (theme) {
        case "sea": {
            console.log("sea")
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
          this.chatHandler.chatPrint("¿Qué cojonazos? No existe " + theme);
            break;
    }}


   

    

}



 

    
