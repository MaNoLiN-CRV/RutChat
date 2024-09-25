import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';


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

// Clients map
let clients:Map<string,boolean> = new Map;
let adminIps:string[]


function welcome():string{
    return "Server: Welcome to RutChat !!! Please respect the other users :) "
}

function admin(message:string , ip:string): boolean{
    if (message == "adminPassword") {
        adminIps.push(ip);
        console.log("NEW ADMIN DECLARED -> " + ip)
        return true;
    }
    else {
        return false;
    }
}
function banned(message:string , ip:string):boolean {
    if (message.includes("/ban ") && adminIps.includes(ip)){
        let ipBan:string = message.split(" ")[1]
        clients.set(ipBan,true)
        console.log(ipBan + " -> banned from the chat")
        return true;
    }
    else{
        return false;
    }
}

// Easy events 
io.on('connection', (socket) => {
    let id = socket.id;
    console.log('New client connected to RutChat!:', id);
    socket.send(welcome())
    
    // BANNED CHECKER
    if (!(id in clients)){
        clients.set(id,false);
    }else {
        if(clients.get(id)){
            socket.send("Server: You are banned from the server :( | Please contact Manolin")
            socket.disconnect(true)
        }
    }

    
    // Message event handling
    socket.on('message', (message: string) => {
        // We send the message to the clients.
        let filteredMessage:string = "[" + id + "]" + " -> " + message;
        if (!(admin(message,id)) && !banned(message,id)){
            io.emit('message', filteredMessage);
        }
        
    });

    // Client disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected: ', id);
    }); 
});


httpServer.listen(3000, () => {
    console.log('Server listening in http://localhost:3000');
});
