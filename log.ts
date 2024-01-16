import {LogType} from "./logType";
import {client} from "./discord";
import {debugGuildId, debugChannelId} from "./config/config.json"
import {EmbedBuilder, TextChannel} from "discord.js";
import {getCurrentTime} from "./util";

export async function successLog(message: string){
    await log(message, LogType.Success)
}
export async function infoLog(message: string) {
    await log(message, LogType.Info)
}

export async function warningLog(message: string) {
    await log(message, LogType.Warning)
}

export async function errorLog(message: string) {
    await log(message, LogType.Error)
}

async function log(message: string, logType: LogType) {
    console.log(`<${LogType[logType]}> ${message}`);
    const time = getCurrentTime();
    const guild = await client.guilds.fetch(debugGuildId);
    const channel = await guild.channels.fetch(debugChannelId);
    if(!(channel instanceof TextChannel)){
        console.log("Debug Channel was not a text channel")
        return;
    }
    const logEmbed = new EmbedBuilder()
        .setFields(
            {name:"Level:",value:LogType[logType]},
            {name:"Time:", value: time},
            {name:"Message:", value: message}
        ).setColor(logType.valueOf());

    await channel.send({embeds: [logEmbed]})

    //Send To discord channel
    //Write to file
    //Console.log
}
