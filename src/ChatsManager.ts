import server from "./server.ts";

export class ChatsManager {

    

    static chats: Array<server>;

    static init(numberOfChats: number) {
        this.chats = new Array<server>();
        for (let i = 0; i < numberOfChats; i++) {
            this.chats.push(new server(i));
        }
    }

    static startChats() {
        let basePort:number = 3000;
        if (this.chats) {
            this.chats.forEach((chat:server) => {
               chat.start(basePort);
               basePort++;
            });
        }
    }


}