import {Command} from "../Command";
import {GuildMember} from "discord.js";

const { SlashCommandBuilder } = require('discord.js');

export const command: Command = {
	admin:false,
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		const guildMember: GuildMember = interaction.member as GuildMember;
		await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${guildMember.joinedAt}.`);
	},
};
