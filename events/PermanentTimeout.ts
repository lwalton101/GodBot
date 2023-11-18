import {EventHandler} from "../EventHandler";
import {Events, Message} from "discord.js";
import {config} from "../index";
import {client} from "../discord";

export const eventHandler: EventHandler = {
    name: Events.ClientReady,
    once: false,
    async execute() {
        setInterval(async () => {
            for(let guildId of config.getConfigOption("infiniteTimeoutGuilds").split(",")){
                let guild = await client.guilds.fetch(guildId).catch(e => {});
                if(!guild){
                    return;
                }
                for(let id of config.getConfigOption("infiniteTimeoutMembers").split(",")){
                    let guildMember = await guild.members.fetch(id).catch(e => {});
                    if(!guildMember){
                        return;
                    }
                    try{
                        await guildMember.timeout(1000 * 60 * 60 * 24 * 27);
                    }catch (e){
                        console.log("Something went wrong");
                    }

                }
            }
        }, config.getConfigOption("infiniteTimeoutCheckoutAmount"))
    }

}