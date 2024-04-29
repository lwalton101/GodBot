import {Command} from "../Command";
import {Colors, EmbedBuilder, GuildMember, SlashCommandBuilder} from "discord.js";
import {userSentimentRepo} from "../data-source";
import {client} from "../discord";


export const command: Command = {
    admin: false,
    data: new SlashCommandBuilder()
        .setName('server_sentiment')
        .setDescription('Responds with the overall happyness of each member of the server'),
    async execute(interaction) {
        await interaction.deferReply()
        const userSentiments = await userSentimentRepo.find();
        userSentiments.sort((a,b) => (b.totalSentiment / b.numberOfMessages) - (a.totalSentiment / a.numberOfMessages))
        let responseText = ""
        for (let i = 0; i < userSentiments.length; i++) {
            try{
                const user = await client.users.fetch(userSentiments[i].userId);
                if(!user){
                    continue;
                }
                responseText += `${i+1}.) ${user.username}: ${userSentiments[i].totalSentiment / userSentiments[i].numberOfMessages}\n`
            } catch (e){
                console.log("AH shitty no user bug, why not let me catch errors earlier when I get the user discord fuck you discord")
            }

        }

        const embed = new EmbedBuilder()
            .setTitle("Server Sentiment")
            .setDescription(responseText)
            .setColor(Colors.Red)

        await interaction.editReply({
            embeds: [embed]
        })

    },
};
