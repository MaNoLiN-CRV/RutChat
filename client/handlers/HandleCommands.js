
import {chatPrint} from './HandleChat.js';

function filterCommand(command) {
 
  
    switch (command) {
      case "/help": {
        chatPrint(helpOptions,'#16f4fc');
        break;
      };
      case "/files": {
        socket.emit("files");
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
        messagesDiv.innerHTML = "";
        break;
      };
      case "/styles":{
        chatPrint(styles, 'white');
        break;
      };

      case command.includes("/download"):{
        let filename = command.split("/download ")[1];
        let downloader = document.getElementById("downloadLink");
        downloader.href = '/uploads/' + filename;
        downloader.click();
    
        chatPrint("File " + filename + " downloaded." , "lightgreen")
      }

      case command.startsWith("/changeBloste"): {
        const theme = command.split("/changeBloste ")[1];
        handleBlosteChange(theme);
      };
      
      default:
        chatPrint("No command found.");
        break; 
    }
  messageInput.value = "";
}


function handleBlosteChange(theme) {

    // Removemos el /# del inicio del comando para obtener solo el nombre del tema
    const themeName = theme.replace('/#', '');
    
    switch (themeName) {
        case "sea": {
            document.documentElement.setAttribute('data-theme', 'sea');
            chatPrint("Tema cambiado a Sea Bloste");
            break;
        }
        case "bloste": {
            document.documentElement.setAttribute('data-theme', 'bloste');
            chatPrint("Tema cambiado a Bloste");
            break;
        }
        case "nordic": {
            document.documentElement.setAttribute('data-theme', 'nordic');
            chatPrint("Tema cambiado a Nordic");
            break;
        }
        default:
            chatPrint("¿Qué cojonazos? No existe ese tema");
            break;
    }}