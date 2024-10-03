import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { SalaConfig } from "./SalaConfig.ts";
import { CustomStorage } from "./CustomStorage.ts";
import { CustomFileTransfer } from "./CustomFileTransfer.ts";
import { events } from "./events.ts";

// FRAMEWORK CONFIG

// Express is a framework that allows to easy control the endpoints of a http server
// Also it can serve static resources like html , css and javascript
// It uses the native http module from node.js

export default class server {

  app: express.Application;
  httpServer: any;
  io: Server;
  config: SalaConfig;
  storage: CustomStorage;
  customFileTransfer: CustomFileTransfer;
  eventsManager: events;


  constructor() {
    // The http server delegates the http requets to our Express framework.
    this.app = express();
    // We creates a socket server
    this.httpServer = createServer(this.app);
    this.io = new Server(this.httpServer);

    this.config = new SalaConfig().build()
      .setDefaultWelcome("Server: Welcome to RutChat by MaNoLiN & Félix !!! use /help")
      .setMaxMessageLength(200)
      .setMaxUsernameLength(20)
      .setPort(3000)
      .setMaxFileSizeMb(100)
      .setDefaultUsername("Anonymous")
      .setSecretPass("secret");
      
      this.customFileTransfer = new CustomFileTransfer(this.config, this.app, this.io);
      this.storage = new CustomStorage();

      // THIS ALWAYS HAS TO BE AT THE FINAL BLOSTE
      this.eventsManager = new events(this.io, this.config,this.storage);
  };
  public start(port: number) {
    // We serve the statics files in the "public" folder
    this.app.use(express.static(this.storage.getPublicFolder()));
  }
}

