import * as fs from 'fs';
import multer from "multer";
export class CustomStorage {

    private uploadPath: string;
    private publicFolder: string;
    private maxFoldersAllowed: number = 20;
    private relativePath: string = ".";
    private storage: multer.StorageEngine;
    private genericFilesPath:string = "/genericFiles/";

    constructor() {
        this.publicFolder = this.uploadPathFolder();
        this.uploadPath = "/uploads/";
        this.storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, this.publicFolder + this.uploadPath);
            },
            filename: (req, file, cb) => {
                cb(null, this.filenamesStorage(file.originalname));
            },
        });

        copyFolder(this.genericFilesPath,this.publicFolder);
    }
    // AUTOMATIC FOLDER CREATOR BLOSTONAZO
    private uploadPathFolder(): string {
        let finalPath = "";
        for (let index = 0; index < this.maxFoldersAllowed; index++) {
            let upPath = this.relativePath + "public" + index;
            if (!(fs.existsSync(upPath))) {
                fs.mkdirSync(upPath)
                finalPath = upPath;
                index = this.maxFoldersAllowed + 1;
            };
        }
        return finalPath;
    }

    private filenamesStorage(filename: string): string {
        let file: string[] = filename.split('.');
        return file[0] + Math.floor(Math.random() * 10) + '.' + file[1];
    }

    public getStorage(): multer.StorageEngine {
        return this.storage;
    }

    public getUploadPath(): string {
        return this.uploadPath;
    }

    public setUploadPath(uploadPath: string): void {
        this.uploadPath = uploadPath;
    }

    public getPublicFolder(): string {
        return this.publicFolder;
    }

    public setPublicFolder(publicFolder: string): void {
        this.publicFolder = publicFolder;
    }

    public filenames(folder: string): string[] {
        {
            let filenames: string[] = new Array();
            const fs = require("fs");

            try {
                const files = fs.readdirSync(folder);;
                files.forEach((file: string) => {
                    filenames.push(file);
                });
            } catch (err) {
                console.error("Error reading folder:", err);
            }
            return filenames;
        }
    }

    private async function copyFolder(source: string, destination: string) {
        try {
            await fs.mkdir(destination, { recursive: true });
            const entries = await fs.readdir(source, { withFileTypes: true });
            for (const entry of entries) {
                const sourcePath = path.join(source, entry.name);
                const destinationPath = path.join(destination, entry.name);
                if (entry.isDirectory()) {
                    await copyFolder(sourcePath, destinationPath);
                } else {
                    await fs.copyFile(sourcePath, destinationPath);
                }
            }
    
        } catch (error) {
            console.error(error);
        }
    }
}

