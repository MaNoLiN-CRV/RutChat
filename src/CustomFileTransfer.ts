import multer from "multer";
import { CustomStorage } from "./CustomStorage.ts";
import { SalaConfig } from "./SalaConfig";
import express from "express";
import { Server } from "socket.io";
import * as fs from 'fs';
export class CustomFileTransfer {

    storage: CustomStorage;
    salaConfig: SalaConfig;
    upload: multer.Multer;
    app: express.Application;
    io: Server

    constructor(salaConfig: SalaConfig, app: express.Application, io: Server , storage: CustomStorage) {
        this.storage = storage;
        this.salaConfig = salaConfig;
        this.app = express.application;
        this.io = io;
        

        this.upload = multer({
            storage: this.storage.getStorage(),
            limits: { fileSize: salaConfig.maxFileSizeMb * 1024 * 1024 },
        });

        // File upload
        this.app.post(this.storage.getUploadPath(), this.upload.single("file"), (req, res) => {
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

        // File download
        app.get(this.storage.getUploadPath() + ":filename", (req, res) => {
            const filePath = this.storage.getPublicFolder() + this.storage.getUploadPath();
            // If file exists
            if (fs.existsSync(filePath)) {
                res.download(filePath);
            } else {
                res.send("File not found.");
            }
        });



    }

}