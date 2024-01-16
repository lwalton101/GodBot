import {CacheType, ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";

export interface Command{
    data: any;
    execute: (interaction: ChatInputCommandInteraction<CacheType>) => Promise<void>;
    admin: boolean;
}