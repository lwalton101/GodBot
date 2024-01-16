import {Command} from "../Command";
import {GuildMember, SlashCommandBuilder} from "discord.js";


export const command: Command = {
	admin: false,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {

		await interaction.reply('Pong!');
	},
};

var t = new SlashCommandBuilder()
	.setName('setpermnickname')
	.setDescription(`Sets a user\`s permanent nickname`)
	.addUserOption(option =>
		option.setName("user")
			.setDescription("The user whose name will be changed!"));
