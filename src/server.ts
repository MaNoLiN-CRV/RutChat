import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { client } from "./clients/client";
import multer from "multer";
import path from "path";
import fs from "fs";

// FRAMEWORK CONFIG

// Express is a framework that allows to easy control the endpoints of a http server
// Also it can serve static resources like html , css and javascript
// It uses the native http module from node.js
const app = express();
// The http server delegates the http requets to our Express framework.
const httpServer = createServer(app);
// We creates a socket server
const io = new Server(httpServer);

// We serve the statics files in the "public" folder
app.use(express.static("public"));

/////// GLOBAL VARIABLES ////////

const port: number = 3000;
const maxUsernameLength: number = 20;
const maxMessageLength: number = 200;
const defaultUsername = "Anonymous";
const defaultWelcome: string = "Server: Welcome to RutChat by MaNoLiN !!! use /help";
const secretPass: string = "secret";
const maxFileSizeMb: number = 100;

///////////////////////////////////

// FILE UPLOAD CONFIG

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, filenamesStorage(file.originalname));
  },
});

function filenamesStorage(filename:string):string{
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
  const filePath = path.join(__dirname, "public" ,"uploads", req.params.filename);
  console.log('ass' + filePath)
  // If file exists
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.send("File not found.");
  }
});

// Folder filenames

function filenames(folder: string): string[] {
  let filenames: string[] = new Array();
  const fs = require("fs");

  try {
    const files = fs.readdirSync(folder);
    files.forEach((file:string) => {
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

// Easy events
io.on("connection", (socket) => {
  let passwordFailed: boolean = true;
  console.log("New client connected to RutChat!:", socket.id);
  let currentClient: client = new client(socket.id, "Anonymous");

  // LOGIN EVENT
  socket.on("login", (password: string) => {
    if (password !== secretPass) {
      socket.emit("message", "Server: Login Failed!!! ");
      socket.disconnect(true);
      console.log("Failed login!");
    } else {
      passwordFailed = false;
    }
  });

  // ENUMERATION OF SERVER FILES EVENT
  socket.on("files", () => {
    socket.emit("files", filenames("./public/uploads/").toString());
  });

  // USERNAME EVENT
  socket.on("username", (username: string) => {
    let finalUsername: string;
    if (username.length < maxUsernameLength) {
      finalUsername = username;
    } else {
      finalUsername = defaultUsername;
    }
    currentUsers += 1;
    currentClient = new client(socket.id, finalUsername);
    io.emit("message", currentClient.getUsername() + " has connected.");
    io.emit("clients", "Users conected: " + currentUsers);
  });
  socket.send(welcome());

  // Message event handling
  socket.on("message", (message: string) => {
    // We send the message to the clients.
    let filteredMessage: string =
      "[" + currentClient.getUsername() + "]" + " -> " + message;
    if (!(message.length > maxMessageLength)) {
      io.emit("message", filteredMessage);
    }
  });

  // Client disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected: ", currentClient.getUsername());
    if (!passwordFailed) {
      io.emit("message", currentClient.getUsername() + " has disconnected.");
      currentUsers -= 1;
      io.emit("clients", "Users conected: " + currentUsers);
    }
  });
});

httpServer.listen(port, () => {
  console.log("Server listening in http://localhost:" + port);
});
