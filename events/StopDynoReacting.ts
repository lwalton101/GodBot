import {EventHandler} from "../EventHandler";
import {Client, Events, Message, MessageReaction, User} from "discord.js";

export const eventHandler: EventHandler<Events.MessageReactionAdd> = {
    name: Events.MessageReactionAdd,
    once: false,
    async execute(reaction: MessageReaction, user: User) {
        if (user.id == "155149108183695360") {
            await reaction.remove();
        }
    }
}