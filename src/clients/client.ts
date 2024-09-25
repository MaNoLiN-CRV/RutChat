// NOT USING THIS YET 
export class client{
    private ip: string = "";
    constructor(ip:string) {
        this.ip = ip;
    }
    getIp():string {
        return this.ip;
    }
}