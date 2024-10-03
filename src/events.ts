import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { client } from "./clients/client";
import multer from "multer";
import path from "path";
import fs from "fs";
import server from "./server";




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