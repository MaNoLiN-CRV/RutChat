
export class client{
    private id:string = " ";
    private username:string = " ";
    private isLogged:boolean = false;

    constructor(id:string , username:string) {
        this.id = id;
        this.username = username;
    }
    getId():string {
        return this.id;
    }
    getUsername():string {
        return this.username;
    }
    setUsername(username:string){
        this.username = username;
    }
    setId(id:string){
        this.id = id;
    }
    
}