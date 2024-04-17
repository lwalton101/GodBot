import {Command} from "../Command";
import {SlashCommandBuilder, TextChannel} from "discord.js";
import {client} from "../discord";

export const command: Command = {
    admin: true,
    data: new SlashCommandBuilder()
        .setName('deletemessage')
        .setDescription('Deletes a Message')
        .addStringOption(option =>
                option
                    .setName("guild_id")
                    .setDescription("The Guild ID")
                    .setRequired(true))
        .addStringOption(option =>
            option
                .setName("channel_id")
                .setDescription("The Channel ID")
                .setRequired(true)
        ).addStringOption(option =>
            option
                .setName("message_id")
                .setDescription("The Message ID")
                .setRequired(true)),
    async execute(interaction) {
        const guildId = interaction.options.getString("guild_id");
        const channelId = interaction.options.getString("channel_id");
        const messageId = interaction.options.getString("message_id");

        const guild = await client.guilds.fetch(guildId);

        if(!guild){
            await interaction.reply("Cannot find guild " + guildId);
            return;
        }

        const channel = await guild.channels.fetch(channelId);
        if(!channel){
            await interaction.reply("Cannot find channel " + channelId);
            return;
        }

        if(!(channel instanceof TextChannel)){
            await interaction.reply("The channel provided is not a text channel");
            return;
        }

        const message = await channel.messages.fetch(messageId);
        if(!message){
            await interaction.reply("Cannot find message " + messageId);
            return;
        }

        await message.delete();
        await interaction.reply({
            content: "Deleted message",
            ephemeral: true
        })
    },
};