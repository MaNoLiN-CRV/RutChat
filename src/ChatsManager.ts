import {Server} from "./server.ts";

export class ChatsManager {

    static chats = new Array<Server>;

    static init(numberOfChats: number) {
        for (let i = 0; i < numberOfChats; i++) {
            ChatsManager.chats.push(new Server(i));
        }
    }

    static startChats() {
        let basePort:number = 3000;
        if (ChatsManager.chats) {
            ChatsManager.chats.forEach((chat:Server) => {
               chat.start(basePort);
               console.log("NEW CHAT STARTED!")
               basePort++;
            });
        }
    }


}