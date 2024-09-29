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

const port:number = 3000;
const maxUsernameLength:number = 20;
const maxMessageLength:number = 200;
const defaultUsername = "Anonymous";
const defaultWelcome:string = "Server: Welcome to RutChat by MaNoLiN !!! v1.1";
const secretPass:string = "secret"

///////////////////////////////////
function welcome():string{
    return defaultWelcome;
}

let currentUsers:number = 0;

// Easy events 
io.on('connection', (socket) => {
    let passwordFailed:boolean = true;
    console.log('New client connected to RutChat!:', socket.id);
    let currentClient:client = new client(socket.id, "Anonymous");

    // LOGIN EVENT
    socket.on('login', (password:string) => {
        if (password !== secretPass){
            socket.emit('message', "Server: Login Failed!!! ");
            socket.disconnect(true);
            console.log("Failed login!")
        }else{
            passwordFailed = false;
        }
    });

    // USERNAME EVENT
    socket.on('username', (username:string) => {

        let finalUsername:string;
        if (username.length < maxUsernameLength){
            finalUsername = username;
        }
        else {
            finalUsername = defaultUsername;
        }
        currentUsers += 1;
        currentClient = new client(socket.id, finalUsername);
        io.emit('message', currentClient.getUsername() + " has connected.");
        io.emit('clients', "Users conected: " + currentUsers);
    });
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
        console.log('Client disconnected: ', currentClient.getUsername());
        if (!passwordFailed){
            io.emit('message', currentClient.getUsername() + " has disconnected.")
            currentUsers -= 1;
            io.emit('clients', "Users conected: " + currentUsers);
        }
    }); 
});


httpServer.listen(port, () => {
    console.log('Server listening in http://localhost:' + port);
});
