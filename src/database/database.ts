import "reflect-metadata";
import { DataSource } from "typeorm";
import { user } from "./entities/user.ts";

export class database {
    private databaseFile:string = "./database.sqlite";
    private AppDataSource:DataSource;
    /**
     * Initializes the database
     */
    constructor() {
            this.AppDataSource = new DataSource({
            type: "sqlite",
            database: this.databaseFile,
            synchronize: true,
            logging: true,
            entities: [user],
            subscribers: [],
            migrations: [],
        });
    }
    // Miraculous bussiness logic

    /**
     * Opens a database connection and perform a determinated function (async)
     * @param funtion Function to be performed
     * @param args Arguments
     * @returns Promise
     */
    private async connection(fn:Function , args: Object) : Promise<user | null | undefined> {
        let dev;
        try {
            if (!this.AppDataSource.isInitialized) {
                await this.AppDataSource.initialize();
            }
            dev = await fn(args);
        } catch (error) {
            console.error("Error while initializing the connection or executing function: ", error);
        }
        finally {
            try {
                await this.AppDataSource.destroy();
            } catch (destroyError) {
                console.error("Error while closing the connection: ", destroyError);
            }
            return dev;
        }
    }

    // MEGA BLOSTE DATABASE KERNEL MIRACLE
    //CREATE USER FUNCTIONS

    private async createNewUser(user:user) {
        await this.AppDataSource.manager.save(user);
    }

    createUser(user:user) {
        this.connection(this.createNewUser.bind(this), user);
    }

    // FIND USER FUNCTIONS

    private async findUserByName(username: string): Promise<user | null> {
        return await this.
        AppDataSource.manager.findOneBy(user, { username:username });
    }
    
    async findUser(username:string) : Promise<user | null> {
        return (await this.connection(this.findUserByName.bind(this) , username)) as user | null;
    }

    // DELETE USER 

}