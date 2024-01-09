import {ClientEvents, Events} from "discord.js";

export interface EventHandler<K extends keyof ClientEvents>{
    name: K,
    once: boolean,
    execute: (...args: ClientEvents[K]) => void
}