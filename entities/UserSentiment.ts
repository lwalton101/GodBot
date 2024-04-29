import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class UserSentiment{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    userId: string
    @Column()
    totalSentiment: number
    @Column()
    numberOfMessages: number
}