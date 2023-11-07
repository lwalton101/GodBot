import {Command} from "../../Command";
import {GuildMember, SlashCommandBuilder} from "discord.js";


export const command: Command = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {

		await interaction.reply('Pong!');
	},
};
