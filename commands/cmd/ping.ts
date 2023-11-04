import {Command} from "../../Command";
import {GuildMember, SlashCommandBuilder} from "discord.js";


export const command: Command = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		// let time = 10000;
		// setInterval(() => {
		// 	(interaction.member as GuildMember).timeout(time);
		// 	time += 1000;
		// }, 1000);
		await interaction.reply('Pong!');
	},
};
