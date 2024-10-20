import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

Entity()
export class user {
    @PrimaryGeneratedColumn()
    id:number = 0;

    @Column()
    username:string = "";

    @Column()
    password:string = "";

}
