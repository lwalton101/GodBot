import {EventHandler} from "../EventHandler";
import {Events, Message, VoiceState} from "discord.js";

export const eventHandler: EventHandler<Events.MessageCreate> = {
    name: Events.MessageCreate,
    once: false,
    execute(message: Message) {

    }

}