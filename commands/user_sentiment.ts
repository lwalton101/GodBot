import {Command} from "../Command";
import {EmbedBuilder, GuildMember, SlashCommandBuilder} from "discord.js";
import {userSentimentRepo, wordUserRepo} from "../data-source";


export const command: Command = {
    admin: false,
    data: new SlashCommandBuilder()
        .setName('user_sentiment')
        .setDescription("Gets a user's sentiment score")
        .addUserOption(option => option.setName("user").setDescription("The user").setRequired(true)),
    async execute(interaction) {
await interaction.deferReply();
        const user = interaction.options.getUser("user");
        const exists = await userSentimentRepo.exists({where: {
            userId: user.id
        }})

        if(exists){
            var userSentiment = await userSentimentRepo.findOneBy({userId: user.id});
            var embed = new EmbedBuilder().setTitle(`Sentiment analysis - ${user.username}`).setDescription(
                `Total sentiment score: ${userSentiment.totalSentiment}
                Number Of Messages: ${userSentiment.numberOfMessages}
                Average Score: ${userSentiment.totalSentiment / userSentiment.numberOfMessages}`
            )

            await interaction.editReply({embeds: [embed]});
        } else{
            await interaction.editReply("Could not find user record in database")
        }
    },
};