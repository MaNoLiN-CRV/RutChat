import {server} from "./server.ts";

export class ChatsManager {

    static chats = new Array<server>;

    static init(numberOfChats: number) {
        this.chats = new Array<server>();
        for (let i = 0; i < numberOfChats; i++) {
            ChatsManager.chats.push(new server(i));
        }
    }

    static startChats() {
        let basePort:number = 3000;
        if (this.chats) {
            this.chats.forEach((chat:server) => {
               chat.start(basePort);
               console.log("NEW CHAT STARTED!")
               basePort++;
            });
        }
    }


}