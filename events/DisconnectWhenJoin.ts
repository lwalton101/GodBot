import {EventHandler} from "../EventHandler";
import {Client, Events, VoiceState} from "discord.js";
import {client} from "../discord";
import {config} from "../index";

export const eventHandler: EventHandler<Events.VoiceStateUpdate> = {
    name: Events.VoiceStateUpdate,
    once: false,
    execute(oldState: VoiceState, newState: VoiceState){
        if(!newState){
            return;
        }

        if(!newState.channel){
            return;
        }

        if(!newState.channel.members){
            return;
        }

        newState.channel.members.forEach((value, key, map) => {
            for(let id of config.getConfigOption("disconnectWhenJoin").split(",")){
                if(value.id == id){
                    value.voice.disconnect();
                }
            }
        });
    }
}
