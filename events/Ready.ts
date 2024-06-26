import {EventHandler} from "../EventHandler";
import {Client, Events} from "discord.js";

export const eventHandler: EventHandler<Events.ClientReady> = {
    name: Events.ClientReady,
    once: true,
    execute(client: Client){
        console.log(`Ready! Logged in as ${client.user.tag}`);
    }
}