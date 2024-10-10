import multer from "multer";
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import path from "path";
import * as console from "console";


export class CustomStorage {

    private uploadPath: string;
    private publicFolder!: string;
    private maxFoldersAllowed: number = 20;
    private relativePath: string = ".";
    private storage: multer.StorageEngine;
    private genericFilesPath: string = "./genericFiles/";
    private _id:number; 

    constructor(id:number) {
        this._id = id;
        if (!fs.existsSync(this.relativePath + "public" + this._id)){
            this.publicFolder = this.uploadPathFolder();
            this.copyFolder(this.genericFilesPath, this.publicFolder);
            this._id = Number.parseInt(this.publicFolder.split("public")[1])
        }

        this.uploadPath = "/uploads/";
        this.storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, this.publicFolder + this.uploadPath);
            },
            filename: (req, file, cb) => {
                cb(null, this.filenamesStorage(file.originalname));
            },
        });


    }

    // AUTOMATIC FOLDER CREATOR BLOSTONAZO
    private uploadPathFolder(): string {
        let finalPath = "";
        for (let index = 0; index < this.maxFoldersAllowed; index++) {
            let publicPath = this.relativePath + "public" + index;
            if (!(fs.existsSync(publicPath))) {
                // CREATES THE UPLOAD PATH
                fs.mkdirSync(publicPath)
                finalPath = publicPath;
                index = this.maxFoldersAllowed + 1;
            }
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


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    public filenames(folder: string): string[] {
        {
            let filenames: string[] = new Array();
            const fs= require("fs");

            try {
                const files = fs.readdirSync(folder);
                files.forEach((file: string) => {
                    filenames.push(file);
                });
            } catch (err) {
                console.error("Error reading folder:", err);
            }
            return filenames;
        }
    }

    // COPY THE SOURCE FOLDER TO THE DESTINATION FOLDER
    private async copyFolder(source: string, destination: string) {
        try {

            await fsPromises.mkdir(destination, {recursive: true});
            const entries = await fsPromises.readdir(source, {withFileTypes: true});
            for (const entry of entries) {

                const sourcePath = path.join(source, entry.name);
                const destinationPath = path.join(destination, entry.name);
                if (entry.isDirectory()) {
                    await this.copyFolder(sourcePath, destinationPath);
                } else {
                    await fsPromises.copyFile(sourcePath, destinationPath);
                }
            }

        } catch (error) {
            console.error(error);
        }
    }

}

