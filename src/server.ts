import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { client } from "./clients/client";
import multer from "multer";
import path from "path";
import fs from "fs";
import {ServerConfig} from "./serverConfig.ts";

// FRAMEWORK CONFIG

// Express is a framework that allows to easy control the endpoints of a http server
// Also it can serve static resources like html , css and javascript
// It uses the native http module from node.js

export default class server {

      app: express.Application;
      httpServer: any;
      io : Server;
      config: ServerConfig;
      storage: multer.StorageEngine;



      constructor() {
            // The http server delegates the http requets to our Express framework.
            this.app = express();
            // We creates a socket server
            this.httpServer = createServer(this.app);
            this.io = new Server(this.httpServer);

            this.config = new ServerConfig().build()
            .setDefaultWelcome("Server: Welcome to RutChat by MaNoLiN & Félix !!! use /help")
            .setMaxMessageLength(200)
            .setMaxUsernameLength(20)
            .setPort(3000)
            .setMaxFileSizeMb(100)
            .setDefaultUsername("Anonymous")
            .setSecretPass("secret");

            this.storage = multer.diskStorage({
              destination: (req, file, cb) => {
                cb(null, "./public/uploads/");
              },
              filename: (req, file, cb) => {
                cb(null, filenamesStorage(file.originalname));
              },
            });

              




            };
            
      

      public start(port: number) {
            // We serve the statics files in the "public" folder
          this.app.use(express.static("public"));

      }
      
   
      


}





///////////////////////////////////

// FILE UPLOAD CONFIG

function filenamesStorage(filename:string):int{
  let file:string[] = filename.split('.');
   return file[0] + Math.floor(Math.random() * 10) + '.' + file[1];
}

// Upload configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: maxFileSizeMb * 1024 * 1024 },
});

// File upload
app.post("/uploads/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("Error uploading the file.");
  }
  else{
  io.emit(
    "fileUpload",
    "Server: File " + req.file.filename + " uploaded to server storage."
  );
  return res.status(200);
  }
});

// File download
app.get("/uploads/:filename", (req, res) => {
  const filePath = path.join(__dirname "public" ,"uploads", req.params.filename);
  console.log('ass' + filePath)
  // If file exists
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.send("File not found.");
  }
});

// Folder filenames

function filenames(folder: string): string[] {{
  let filenames: string[] = new Array();
  const fs = require("fs");

  try {
    const files = fs.readdirSync(folder);;
    filesforEach((file:string) => {
      filenames.push(file);
    });
  } catch (err) {
    console.error("Error reading folder:", err);
  }
  return filenames;
}
function welcome(): string {
  return defaultWelcome;
}

let currentUsers: number = 0;



httpServer.listen(port, () => {
  console.log("Server listening in http://localhost:" + port);
});
