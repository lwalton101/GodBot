import {EventHandler} from "../EventHandler";
import {Client, Events, GuildMember} from "discord.js";

export const eventHandler: EventHandler = {
    name: Events.GuildMemberUpdate,
    once: false,
    execute(oldMember: GuildMember, newMember: GuildMember){
        if(newMember.id == "547459595300503552"){
            try{
                newMember.setNickname("boykisser");
            } catch (e){
                console.log("failing again");
            }

        }
    }
}