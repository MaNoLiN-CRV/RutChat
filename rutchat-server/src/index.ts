import express, { Express } from 'express';
import { Server } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';

const app: Express = express();
const httpServer: Server = new Server(app);

// Configure CORS for both Express and Socket.IO
app.use(cors({
    origin: ["http://localhost:8081", "http://localhost:3000"],
    methods: ["GET", "POST"],
}));

const io: SocketIOServer = new SocketIOServer(httpServer);

const port: number = 3000;

httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

io.on("connection", (socket) => {
    
    console.log(`Conectado desde ${socket}`);

    socket.on("message", (msg) => {
        io.emit("message", msg);
    })

});
