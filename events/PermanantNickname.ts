import {EventHandler} from "../EventHandler";
import {Client, Events, GuildMember} from "discord.js";
export const eventHandler: EventHandler<Events.GuildMemberUpdate> = {
    name: Events.GuildMemberUpdate,
    once: false,
    execute(oldMember: GuildMember, newMember: GuildMember){
        // for(let nameNValue of config.getConfigOption("permanentNicknames").split(",")){
        //     if(newMember.id == nameNValue.split(";")[0]){
        //         try{
        //             newMember.setNickname(nameNValue.split(";")[1]);
        //         } catch (e){
        //             console.log("failing again");
        //         }
        //
        //     }
        // }

    }
}