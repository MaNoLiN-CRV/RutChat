import { Server, Socket } from "socket.io";
import { client } from "../clients/client.ts";
import { SalaConfig } from "../SalaConfig.ts";
import { CustomStorage } from "../CustomStorage.ts";

export class events {
  io: Server;
  currenUsers:number = 0;
  config:SalaConfig;
  storage:CustomStorage;
  
  constructor(ioParam: Server, conf:SalaConfig , storageParam:CustomStorage) {
    this.io = ioParam;
    this.config = conf;
    this.storage = storageParam;
    // Easy blostoevents

    
    this.io.on("connection", (socket:Socket) => {
      let passwordFailed: boolean = true;
      console.log("New client connected to RutChat!:", socket.id);
      let currentClient: client = new client(socket.id, this.config.getDefaultUsername());

      // LOGIN EVENT

      socket.on("login", (password: string) => {
        if (password !== this.config.getSecretPass()) {
          socket.emit("login", false);
          socket.disconnect(true);
          console.log("Failed login!");
        } else {
          socket.emit("login", true);
          passwordFailed = false;
        }
      });


      // ENUMERATION OF SERVER FILES EVENT
      socket.on("files", () => {
        socket.emit("files", 
          this.storage.filenames(this.storage.getPublicFolder() + this.storage.getUploadPath()).toString());
      });

      // USERNAME EVENT BLOSTEVENT
      socket.on("username", (username: string) => {
        let finalUsername: string;
        if (username.length < this.config.getMaxUsernameLength()) {
          finalUsername = username;
        } else {
          finalUsername = this.config.getDefaultUsername();
        }
        this.currenUsers += 1;
        currentClient = new client(socket.id, finalUsername);
        this.io.emit("messageConnected", currentClient.getUsername() + " has connected.");
        this.io.emit("clients", "Users conected: " + this.currenUsers);
      });
      socket.send(this.config.getDefaultUsername());




        /**
        * Envia el mensaje a todos los clientes conectados 
        */

      socket.on("message", (message: string) => {

      
        // We send the message to the clients. BLOSTEROIDE
        let filteredMessage: string =
          "" + currentClient.getUsername() + ": " + message;
        if (!(message.length > this.config.getMaxMessageLength())) {
          this.io.emit("message", filteredMessage);
        }



      });

      // Client disconnection BLOSTE
      socket.on("disconnect", () => {
        console.log("Client disconnected: ", currentClient.getUsername());
        if (!passwordFailed) {
          this.io.emit("message", currentClient.getUsername() + " has disconnected.");
          this.currenUsers -= 1;
          this.io.emit("clients", "Users conected: " + this.currenUsers);
        }
      });

    });
  } 
}
//SUPER BLOSTE