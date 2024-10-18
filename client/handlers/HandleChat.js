
 class HandleChat{

    chatPrint(text, options) {

        let newMessage;
        
        // Si options es un string y es "special", manejamos el caso especial
        if (options === "special") {
          alert("AQUI NOT NULL");
          newMessage = document.createElement("h");
          newMessage.textContent = text;
          newMessage.style.color = "blue"; 
          messagesDiv.appendChild(newMessage);
        } 
        // Si es un string y no es "special", es un puto jodido bloste color
        else if (typeof options != null) {
          alert("AQUI NOT NULL");
          newMessage = document.createElement("p");
          newMessage.textContent = text;
          messagesDiv.appendChild(newMessage).style.color = options;
          messagesDiv.appendChild(newMessage);
        } else if (options == null){
          alert("AQUI NOT NULL");
          newMessage = document.createElement("p");
          newMessage.textContent = text;
          messagesDiv.appendChild(newMessage);
        }
      
        messagesDiv.scrollTop = messagesDiv.scrollHeight; // Mantiene el scroll en la parte inferior BLOSTEJAJA
      }



} export default HandleChat;

