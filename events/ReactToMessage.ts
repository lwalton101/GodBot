import {EventHandler} from "../EventHandler";
import {Client, Events, Message, MessageReaction, User} from "discord.js";

export const eventHandler: EventHandler = {
    name: Events.MessageCreate,
    once: false,
    execute(message: Message){
        if(message.author.id == "1140794078271897621"){
            // message.react("🤓")
            // message.react("🇷");
            // message.react("🇪");
            // message.react("🇨");
            // message.react("🇾");
            // message.react("🆑");
            // message.react("♻️");
            // message.react("🇩");
        } else{
            message.reactions.removeAll()
                .catch(error => console.error('Failed to clear reactions:', error));
        }

        if(message.author.id == "1159197253601345587"){
            message.react("🇨");
            message.react("🇺");
            message.react("🇳");
            message.react("🇹");
            message.react("🖕")
        }

        if(message.author.id == "758763540768620564"){
            message.react("🇷");
            message.react("🇾");
            message.react("🇦");
            message.react("🇳");
            message.react("🐭");
        }

        if(message.author.id == "545350139003273238"){
            // message.react("🇳");
            // message.react("🇴");
            // message.react("🇹");
            // message.react("🇭");
            // message.react("🇮");
            // message.react("📈");
            // message.react("🇬");
        }
    }
}