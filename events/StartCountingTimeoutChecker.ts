import {config} from "../index";
import {client} from "../discord";
import {EventHandler} from "../EventHandler";
import {Events, Message} from "discord.js";
export const eventHandler: EventHandler<Events.ClientReady> = {
    name: Events.ClientReady,
    once: false,
    execute() {
        setInterval(async () => {
            for(let guildId of config.getConfigOption("countingTimeoutGuilds").split(",")){
                 let guild = await client.guilds.fetch(guildId).catch(e => {})
                 if(!guild){
                     return;
                 }
                 for(let id of config.getConfigOption("countingTimeoutMembers").split(",")){
                    let guildMember = await guild.members.fetch(id).catch(e => {});
                    if(!guildMember){
                        return;
                    }
                    if(guildMember.communicationDisabledUntilTimestamp > Date.now()){
                        await guildMember.timeout(guildMember.communicationDisabledUntilTimestamp - Date.now() + (Number.parseInt(config.getConfigOption("countingTimeoutCheckoutAmount")) * 2));
                    }
                }
            }
        }, config.getConfigOption("countingTimeoutCheckoutAmount"))
    }

}