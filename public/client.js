const socket = io(); 

const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// Enviar mensaje al servidor
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
