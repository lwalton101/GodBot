import {EventHandler} from "../EventHandler";
import {Client, Events, VoiceState} from "discord.js";

export const eventHandler: EventHandler = {
    name: Events.VoiceStateUpdate,
    once: false,
    execute(oldState: VoiceState, newState: VoiceState){
        if(oldState.channelId && !newState.channelId){
            console.log("User disconnected");
        }

        if(!oldState.channelId && newState.channelId){
            console.log("User connected");
        }
    }
}