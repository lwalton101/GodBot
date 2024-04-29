import {EventHandler} from "../EventHandler";
import {Client, Events, Message} from "discord.js";
import {userSentimentRepo, wordUserRepo} from "../data-source";
import Sentiment from "sentiment"

export const eventHandler: EventHandler<Events.MessageCreate> = {
    name: Events.MessageCreate,
    once: false,
    async execute(message: Message){
        const sent = new Sentiment()
            const exists = await userSentimentRepo.exists({
                where: {
                    userId: message.author.id
                }
            });

            if(exists){
                const userSentiment = await userSentimentRepo.findOneBy({userId: message.author.id});
                await userSentimentRepo.update({userId: message.author.id}, {totalSentiment: userSentiment.totalSentiment + sent.analyze(message.content).score, numberOfMessages: userSentiment.numberOfMessages + 1})
            } else{
                await userSentimentRepo.save([{
                    userId: message.author.id,
                    totalSentiment: sent.analyze(message.content).score,
                    numberOfMessages: 1
                }])
            }

        }
}