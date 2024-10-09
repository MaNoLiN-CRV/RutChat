import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { SalaConfig } from "./SalaConfig.ts";
import { CustomStorage } from "./CustomStorage.ts";
import { CustomFileTransfer } from "./CustomFileTransfer.ts";
import { events } from "./events.ts";
import * as console from "console";
import e from "express";

// FRAMEWORK CONFIG

// Express is a framework that allows to easy control the endpoints of a http server
// Also it can serve static resources like html , css and javascript
// It uses the native http module from node.js

export default class server {

  private _app: express.Application;
  private _httpServer: any;
  private _io: Server;
  private _config: SalaConfig;
  private _storage: CustomStorage;
  private _customFileTransfer: CustomFileTransfer;
  private _eventsManager: events;
  private _ID:number;


  constructor(id:number) {
    this._ID = id;
    // The http server delegates the http requets to our Express framework.
    this._app = express();
    // We creates a socket server
    this._httpServer = createServer(this._app);
    this._io = new Server(this._httpServer);

    this._config = new SalaConfig().build()
      .setDefaultWelcome("Server: Welcome to RutChat by MaNoLiN & Félix !!! use /help")
      .setMaxMessageLength(200)
      .setMaxUsernameLength(20)
      .setPort(3000)
      .setMaxFileSizeMb(100)
      .setDefaultUsername("Anonymous")
      .setSecretPass("secret");

      this._storage = new CustomStorage(this._ID);
      this._customFileTransfer = new CustomFileTransfer(this._config, this._app, this._io,this._storage);

      // THIS ALWAYS HAS TO BE AT THE FINAL BLOSTE
      this._eventsManager = new events(this._io, this._config,this._storage);
  };
  public start(port: number) {
    // We serve the statics files in the "public" folder
    this._app.use(express.static(this._storage.getPublicFolder()));

    this._httpServer.listen(port, () => {
      console.log("Server listening in http://localhost:" + port);
    });

  }

  // GETTERS AND SETTERS

  get app(): e.Application {
    return this._app;
  }

  get httpServer(): any {
    return this._httpServer;
  }

  get io(): Server {
    return this._io;
  }

  get config(): SalaConfig {
    return this._config;
  }

  get storage(): CustomStorage {
    return this._storage;
  }

  get customFileTransfer(): CustomFileTransfer {
    return this._customFileTransfer;
  }

  get eventsManager(): events {
    return this._eventsManager;
  }

  get ID(): number {
    return this._ID;
  }

  get id(): number {
    return this._ID;
  }
  set id(value: number) {
    this._ID = value;
  }

}

