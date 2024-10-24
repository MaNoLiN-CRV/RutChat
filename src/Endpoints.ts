import multer from "multer";
import { CustomStorage } from "./CustomStorage.ts";
import { SalaConfig } from "./SalaConfig.ts";
import express from "express";
import { Server } from "socket.io";
import * as fs from 'fs';
import { jwtManager } from "jwt/jwtManager.ts";
export class CustomFileTransfer {

    storage: CustomStorage;
    salaConfig: SalaConfig;
    upload: multer.Multer;
    app: express.Application;
    io: Server
    validator = jwtManager.authenticateToken;
    /**
     * File transfer class constructor
     * @param salaConfig Configuration of the chat
     * @param app Express app
     * @param io IO socket server
     * @param storage Custom storage of the chat
     */
    constructor(salaConfig: SalaConfig, app: express.Application, io: Server, storage: CustomStorage) {
        this.storage = storage;
        this.salaConfig = salaConfig;
        this.app = app;
        app.use(express.json());
        this.io = io;
        this.upload = multer({
            storage: this.storage.getStorage(),
            limits: { fileSize: salaConfig.maxFileSizeMb * 1024 * 1024 },
        });


        //POST FILE UPLOAD CONFIGURATION (Vlosty)

        this.app.post(this.storage.getUploadPath(), this.upload.single("file"), this.validator, (req, res) => {
            if (!req.file) {
                return res.status(400).send("Error uploading the file.");
            }
            else {
                this.io.emit(
                    "fileUpload",
                    "Server: File " + req.file.filename + " uploaded to server storage."
                );
                return res.status(200);
            }
        });

        // FILE UPLOAD FOLDER GET CONFIG
        this.app.get(this.storage.getUploadPath() + ":filename", this.validator ,(req, res) => {
            const filePath = this.storage.getPublicFolder() + this.storage.getUploadPath();
            // If file exists
            if (fs.existsSync(filePath)) {
                res.download(filePath);
            } else {
                res.send("File not found.");
            }
        });

        // TEMPORAL LOGIN (will be deleted when the database is deployed)
        this.app.post("/login", (req, res) => {
            const loginJson = req.body;
            const username = loginJson.username;
            const password = loginJson.password;
            if (password === salaConfig.getSecretPass()) {
                res.json({ token: jwtManager.generateAccessToken(username) });
            }
            else {
                res.json({ token: "" });
            }
        });
    }

}