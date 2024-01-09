import {Command} from "../Command";
import {Collection, EmbedBuilder, GuildMember, Message, SlashCommandBuilder} from "discord.js";
export const command: Command = {
    admin: false,
    data: new SlashCommandBuilder()
        .setName('channelstats')
        .setDescription('Replies with stats about the channel!'),
    async execute(interaction) {
        const channel = interaction.channel;
        let fetchID = interaction.id;
        let savedMessages: Message[] = []
        let userMessageCount: Collection<string, number> = new Collection<string, number>();
        let shouldKeepGoing = true;
        await interaction.deferReply();

        while (shouldKeepGoing) {
            const messages = await channel.messages.fetch({cache: false, limit: 100, before: fetchID});

            if (messages.size == 0) {
                shouldKeepGoing = false;
            }

            messages.forEach(message => {
                if(!userMessageCount.has(message.author.displayName)){
                    userMessageCount.set(message.author.displayName, 0)
                }

                var count = userMessageCount.get(message.author.displayName);
                userMessageCount.set(message.author.displayName, count + 1);
                savedMessages.push(message);
                fetchID = message.id;
            });
        }
        userMessageCount.sort();
        userMessageCount.reverse();
        var messageCountString = `${savedMessages.length} total messages\n`
        userMessageCount.forEach((numberOfMessages, userName) => {
            messageCountString += `${userName}: ${numberOfMessages}\n`
        })

        var finalEmbed = new EmbedBuilder()
            .setTitle("Channel Stats")
            .addFields(
                {name: "Title:", value:channel.name},
                {name:"ID:", value:channel.id},
                {name: "Message Count:", value: messageCountString}
            ).setColor("Green");

        await interaction.editReply({embeds:[finalEmbed]})
    }

};
