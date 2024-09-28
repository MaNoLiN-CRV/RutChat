import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { client } from './clients/client';


// Express is a framework that allows to easy control the endpoints of a http server
// Also it can serve static resources like html , css and javascript
// It uses the native http module from node.js
const app = express();
// The http server delegates the http requets to our Express framework.
const httpServer = createServer(app);
// We creates a socket server
const io = new Server(httpServer);

// We serve the statics files in the "public" folder
app.use(express.static('public'));

/////// GLOBAL VARIABLES ////////

const maxUsernameLength:number = 20;
const maxMessageLength:number = 200;
const defaultUsername = "Anonymous";
const defaultWelcome:string = "Server: Welcome to RutChat by MaNoLiN !!! v1.0";

///////////////////////////////////
function welcome():string{
    return defaultWelcome;
}

let currentUsers:number;

// Easy events 
io.on('connection', (socket) => {
    console.log('New client connected to RutChat!:', socket.id);
    let currentClient:client = new client(socket.id, "Anonymous");

    // USERNAME EVENT
    socket.on('username', (username:string) => {

        let finalUsername:string;
        if (username.length < maxUsernameLength){
            finalUsername = username;
        }
        else {
            finalUsername = defaultUsername;
        }
        currentClient = new client(socket.id, finalUsername);
        io.emit('message', currentClient.getUsername() + " has connected.")
        io.emit('clients', "Users conected: " + currentUsers);
    });

    currentUsers += 1;
    socket.send(welcome())
    

    // Message event handling
    socket.on('message', (message: string) => {
        // We send the message to the clients.
        let filteredMessage:string = "[" + currentClient.getUsername() + "]" + " -> " + message;
        if (!(message.length > maxMessageLength)){
            io.emit('message', filteredMessage);
        }

    });

    // Client disconnection
    socket.on('disconnect', () => {
        io.emit('message', currentClient.getUsername() + " has disconnected.")
        console.log('Client disconnected: ', currentClient.getUsername());
        currentUsers -= 1;
        io.emit('clients', "Users conected: " + currentUsers);
    }); 
});


httpServer.listen(3000, () => {
    console.log('Server listening in http://localhost:3000');
});
