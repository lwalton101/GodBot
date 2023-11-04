import {ClientEvents, Events} from "discord.js";

export interface EventHandler{
    name: keyof ClientEvents,
    once: boolean,
    execute: (...args) => void
}