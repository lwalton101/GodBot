import {EventHandler} from "../EventHandler";
import {Client, Events, Message} from "discord.js";
import {wordUserRepo} from "../data-source";

export const eventHandler: EventHandler<Events.MessageCreate> = {
    name: Events.MessageCreate,
    once: false,
    async execute(message: Message){
        const strings = message.content.split(" ");
        for (let string of strings) {
            const exists = await wordUserRepo.exists({
                where: {
                    word: string,
                    userId: message.author.id
                }
            });

            if(exists){
                const wordUser = await wordUserRepo.findOneBy({userId: message.author.id, word: string});
                await wordUserRepo.update({userId: message.author.id, word: string}, {count: wordUser.count + 1})
            } else{
                var wordUser = await wordUserRepo.save([{
                    userId: message.author.id,
                    word: string,
                    count: 0
                }])
            }

        }
    }
}