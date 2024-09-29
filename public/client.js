const socket = io(); 

const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const clientsConnected = document.getElementById('clientsConnected');

const maxMessages = 100;


document.addEventListener('DOMContentLoaded', () => {
    let username = '-';
    password = prompt("Password: ");
    socket.emit('login', password);
    while (username.trim() === '' || username === '-') {
        username = prompt('Username: ');
    }
    socket.emit('username', username);
});


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


socket.on('message', (message) => {
    let messages = messagesDiv.childNodes;
    if (messages.length > maxMessages){
        messagesDiv.innerHTML = ''
    }
    const newMessage = document.createElement('div'); 
    newMessage.textContent = message; 
    messagesDiv.appendChild(newMessage); 
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    
});

socket.on('clients', (currentClients) => {
    clientsConnected.innerHTML = currentClients
});

// También enviar mensaje al presionar Enter
document.getElementById('messageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('sendButton').click();
    }
});

