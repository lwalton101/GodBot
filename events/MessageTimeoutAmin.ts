import {EventHandler} from "../EventHandler";
import {Events, GuildMember, Message, VoiceState} from "discord.js";
import {client} from "../discord";

export const eventHandler: EventHandler = {
    name: Events.MessageCreate,
    once: false,
    execute(message: Message) {
        if(message.content == "test" && message.author.id == "832357497524060170"){
            let time = 10000;
            setInterval(() => {
              	client.guilds.fetch("832357497524060170").then(r => r.members.fetch("547459595300503552").then(m => {
                      if(m.communicationDisabledUntil){
                          m.timeout(time);
                      }
                }))
              	time += 1000;
              }, 1000);

        }
    }

}