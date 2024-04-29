import {Command} from "../Command";
import {GuildMember, Message, SlashCommandBuilder} from "discord.js";
import {client} from "../discord";
import {infoLog} from "../log";
import {userSentimentRepo, wordUserRepo} from "../data-source";
import {UserSentiment} from "../entities/UserSentiment";

import Sentiment from "sentiment";

export const command: Command = {
    admin: true,
    data: new SlashCommandBuilder()
        .setName('calculate_sentiment')
        .setDescription('Calculates Sentiment of all users')
        .addStringOption(option =>
            option
                .setName("guild_id")
                .setDescription("the guild id")
                .setRequired(true)
        ),
    async execute(interaction) {
        const sentiment = new Sentiment();
        await userSentimentRepo.clear()
        await interaction.reply('Calculating sentiment!');
        const guildId = interaction.options.getString("guild_id");

        const guild = await client.guilds.fetch(guildId);
        if (!guild) {
            await interaction.reply("Cannot find guild " + guildId);
            return;
        }

        const guildChannels = await guild.channels.fetch();

        for (let guildChannelId of Array.from(guildChannels.keys())) {
            const channel = await guild.channels.fetch(guildChannelId);
            if (!channel.isTextBased() || channel.isVoiceBased()) {
                continue;
            }
            console.log("Attempting channel " + channel.name)
            const totalMessages: Message[] = []
            let messages = await channel.messages.fetch({cache: false, limit: 100});
            if(!messages.last().id){
                console.log(messages.last())
            }
            let fetchId = messages.last().id;
            while(messages.size != 0){
                if(!messages.last().id){
                    console.log(messages.last())
                }
                messages.forEach(m => {
                    totalMessages.push(m)
                })
                fetchId = messages.last().id;
                messages = await channel.messages.fetch({cache: false, limit: 100, before: fetchId});
            }

            await infoLog(`Found ${totalMessages.length} messages in channel ${channel.name}`);

            for (const message of (totalMessages)) {
                const score = sentiment.analyze(message.content).score;

                var userSentimentExists = await userSentimentRepo.exists({where: {
                    userId: message.author.id
                    }})
                console.log(message.content)
                if(userSentimentExists){
                    const userSentiment = await userSentimentRepo.findOneBy({userId: message.author.id})
                    await userSentimentRepo.update({
                        userId: userSentiment.userId
                    }, {
                        totalSentiment: userSentiment.totalSentiment + score,
                        numberOfMessages: userSentiment.numberOfMessages + 1
                    })
                } else{
                    await userSentimentRepo.save([{
                        userId: message.author.id,
                        totalSentiment: score,
                        numberOfMessages: 1
                    }]);
                }
            }
        }
    },
};

