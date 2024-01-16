import {Command} from "../Command";
import {SlashCommandBuilder} from "discord.js";
import {errorLog} from "../log";

export const command: Command = {
    admin: true,
    data: new SlashCommandBuilder()
        .setName('setpermnickname')
        .setDescription(`Sets a user\`s permanent nickname`)
        .addStringOption(option =>
            option.setName("guild_id")
                .setDescription("The guild in which the name will be changed in")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("user_id")
                .setDescription("The user whose name will be changed")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("name")
                .setDescription("The name that will be permanently set")
                .setRequired(true)),
    async execute(interaction) {
        const guildId = interaction.options.getString("guild_id");
        const userId = interaction.options.getString("user_id");
        const name = interaction.options.getString("name");

        const guild = await interaction.client.guilds.fetch(guildId);
        
        const guildMember = await guild.members.fetch(userId);

        await guildMember.setNickname(name);
        await interaction.reply(`Set ${guildMember.user.tag}'s name to ${name}`);
    },
};
