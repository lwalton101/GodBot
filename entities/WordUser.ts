import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class WordUser{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    userId: string
    @Column()
    word: string
}