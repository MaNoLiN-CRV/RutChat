const socket = io(); 

const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// Enviar mensaje al servidor
function sendMessage(){
    const message = messageInput.value; 
    if (message) {
        socket.emit('message', message); 
        messageInput.value = ''; 
    }
}
sendButton.addEventListener('click', () => {
    const message = messageInput.value; 
    if (message) {
        socket.emit('message', message); 
        messageInput.value = ''; 
    }
});

// Recibir mensajes del servidor
socket.on('message', (message) => {
    const newMessage = document.createElement('div'); 
    newMessage.textContent = message; 
    messagesDiv.appendChild(newMessage); 
});



// Función para agregar mensajes al cuadro de chat
document.getElementById('sendButton').addEventListener('click', function() {
    const messageInput = document.getElementById('messageInput');
    const chatBox = document.getElementById('messages');
    const message = messageInput.value;

    if (message.trim() !== '') {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = message;

        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Para que el scroll baje al último mensaje

        messageInput.value = ''; // Limpiar el campo de texto
    }
});

// También enviar mensaje al presionar Enter
document.getElementById('messageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('sendButton').click();
    }
});

