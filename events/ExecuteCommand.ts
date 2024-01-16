import {EventHandler} from "../EventHandler";
import {Client, Events} from "discord.js";
import {getCommandByName, getCommands} from "../deploy_commands";
import {errorLog, infoLog} from "../log";

export const eventHandler: EventHandler<Events.InteractionCreate> = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        const command = getCommandByName(interaction.commandName);
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await infoLog(`User <@${interaction.user.id}> used command ${interaction.commandName}`);
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await errorLog(`An error occurred during command ${interaction.commandName}\n`+ error.toString())
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: 'There was an error while executing this command!',
                    ephemeral: true
                });
            } else {
                await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
            }
        }

    }
}