import {Command} from "../Command";
import {GuildMember, Message, SlashCommandBuilder} from "discord.js";
export const command: Command = {
    admin: false,
    data: new SlashCommandBuilder()
        .setName('channelstats')
        .setDescription('Replies with stats about the channel!'),
    async execute(interaction) {
        const channel = interaction.channel;
        let fetchID = interaction.id;
        let savedMessages: Message[] = []
        let shouldKeepGoing = true;

        await interaction.deferReply();

        while (shouldKeepGoing) {
            const messages = await channel.messages.fetch({cache: false, limit: 100, before: fetchID});

            if (messages.size == 0) {
                shouldKeepGoing = false;
            }

            messages.forEach(message => {
                savedMessages.push(message);
                fetchID = message.id;
            });

        }

        await interaction.editReply("done!")
    }
};
