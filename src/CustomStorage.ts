import multer from "multer";
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import path from "path";
import * as console from "console";


export class CustomStorage {

    private uploadPath: string;
    private publicFolder: string;
    private maxFoldersAllowed: number = 20;
    private relativePath: string = ".";
    private storage: multer.StorageEngine;
    private genericFilesPath: string = "./genericFiles/";
    private _id:number;

    /**
     * Custom storage constructor
     * @param id The id is the number of the public folder.
     */
    constructor(id:number) {
        this._id = id;
        this.publicFolder = this.relativePath + "public" + this._id;
        if (!fs.existsSync(this.relativePath + "public" + this._id)){
            this.copyFolder(this.genericFilesPath, this.publicFolder);
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
        console.log("STORAGE " + this._id + " INITIALIZADED | PUBLIC FOLDER: " + this.getPublicFolder())
    }

    /**
     * Automatic folder creator.
     * @returns the public folder path.
     */
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
    
    /**
     * 
     * @param filename The name of the file.
     * @returns The name of the file with a random number
     */
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
    /**
     * 
     * @param folder Target folder
     * @returns the names of the files saved in the folder.
     */
    public filenames(folder: string): string[] {
        {
            let filenames: string[] = new Array();
            const fs = require("fs");

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

    

    /**
     * Copy the content of the source folder to the destination folder.
     * @param source source folder
     * @param destination destination folder
     */
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

