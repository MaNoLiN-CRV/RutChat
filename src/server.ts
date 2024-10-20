import express from "express";
import { Server as SocketServer } from "socket.io";
import { SalaConfig } from "./SalaConfig";
import { CustomStorage } from "./CustomStorage";
import { CustomFileTransfer } from "./CustomFileTransfer";
import { events } from "./events/events";
import * as console from "console";
import https from 'https';

export class Server {
  private _app: express.Application;
  // PERO QUE POLLAS HACIAS CREANDO AQUI EL PUTISIMO HTTPS SERVER, DESGRACIADO DE MIERDA
  private _httpsServer: https.Server;
  private _io: SocketServer;
  private _config: SalaConfig;
  private _storage: CustomStorage;
  private _customFileTransfer: CustomFileTransfer;
  private _eventsManager: events;
  private _ID: number;

  /**
   * Server constructor
   * @param id The folder id number (ex: .public1)
   */
  constructor(id: number) {
    this._ID = id;
    // The http server delegates the http requests to our Express framework.
    this._app = express();

    // CONFIGURAMOS LOS BLOSTES ANTES DE HACER NADA

    

    this._config = new SalaConfig().build()
      .setDefaultWelcome("Server: Welcome to RutChat by MaNoLiN & Félix !!! use /help")
      .setMaxMessageLength(200)
      .setMaxUsernameLength(20)
      .setPort(3000)
      .setMaxFileSizeMb(100)
      .setDefaultUsername("Anonymous")
      .setSecretPass("secret");

    this._storage = new CustomStorage(this._ID);

    // We serve the static files in the "public" folder
    this._app.use(express.static("./client"));
    this._app.use(express.static(this._storage.getPublicFolder()));

    // AHORA SI, CREAMOS PRIMERO EL SERVIDOR Y LUEGO EL SOCKET SERVER CON ESE SERVIDOR HTTPS.
    // EL OTRO SERVIDOR HTTPS QUE HACIAS LOS ATRIBUTOS ESTABA VACIO PUTO LERDO, ENCIMA LUEGO GENERABAS OTRO
    // ME CAGO EN DIOS BLOSTE

    this._httpsServer = https.createServer(this._config.certificates, this._app);



    // CON TODO CONFIGURADO, CREAMOS EL SOCKET SERVER.
    this._io = new SocketServer(this._httpsServer);


    // COMPONENTES QUE DEPENDEN DE SOCKET IO.
    this._customFileTransfer = new CustomFileTransfer(this._config, this._app, this._io, this._storage);
    this._eventsManager = new events(this._io, this._config, this._storage);
  }

  public start(port: number) {
    // POR QUE MIERDAS CREAS AHORA OTRO PUTO SERVIDOR ???? ME CAGO EN LA VIRGEN
    //this._httpsServer = https.createServer(this._config.certificates, this._app);

    this._httpsServer.listen(port, () => {
      console.log("Server listening in https://localhost:" + port);
    });
  }

 






  // GETTERS AND SETTERS

  get app(): express.Application {
    return this._app;
  }

  get io(): SocketServer {
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
