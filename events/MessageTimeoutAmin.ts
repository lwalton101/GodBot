import {EventHandler} from "../EventHandler";
import {Events, GuildMember, Message, VoiceState} from "discord.js";
import {client} from "../discord";

export const eventHandler: EventHandler = {
    name: Events.MessageCreate,
    once: false,
    execute(message: Message) {
        console.log(1)
        if(message.content == "test"){
            console.log(2)

            let time = 10000;
            client.guilds.fetch("832357497524060170").then(r => r.members.fetch("547459595300503552").then(m => {
                    console.log(4)
                    m.timeout(time);
            }))
            setInterval(() => {
                console.log(3)
              	client.guilds.fetch("832357497524060170").then(r => r.members.fetch("547459595300503552").then(m => {
                      if(m.communicationDisabledUntil){
                          console.log(4)
                          m.timeout(time);
                      }
                }))
              	time += 1000;
              }, 1000);

        }
    }

}