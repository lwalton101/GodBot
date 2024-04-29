import {Command} from "../Command";
import {AttachmentBuilder, EmbedBuilder, GuildMember, SlashCommandBuilder} from "discord.js";
import {wordUserRepo} from "../data-source";
import {ChartJSNodeCanvas} from "chartjs-node-canvas";
import {ChartConfiguration} from "chart.js";
import {client} from "../discord";
import {infoLog} from "../log";
import {chart, init} from "../plugin_util";

export const command: Command = {
    admin: false,
    data: new SlashCommandBuilder()
        .setName('getwordusage')
        .setDescription('Responds with a graph with users on x and times used the given word on y')
        .addStringOption(option =>
        option.setName("word").setDescription("The word you want").setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();
        const word = interaction.options.getString("word");
        const wordUsers = await wordUserRepo.findBy({word: word});

        let users: {name:string, count: number, color:string}[]= []
        await infoLog("Init canvas")
        for (let wordUser of wordUsers) {
            const user = await client.users.fetch(wordUser.userId);
            users.push({name: user.username, count: wordUser.count, color: user.hexAccentColor});
        }
        await infoLog("Pushed to list")
        users.sort((a, b) => {
            return b.count - a.count;
        });
        users = users.slice(0,5)
        const names = users.map((x) => x.name);
        const counts = users.map((x) => x.count);
        const colors = users.map((x) => x.color);
        for (let i = 0; i < colors.length; i++) {
            if(!colors[i]){
                colors[i] = "rgba(0,0,0)";
            }
        }
        const chartConfig: ChartConfiguration = {
            type: "bar",
            data: {
                labels: names,
                datasets: [{
                    backgroundColor: colors,
                    data: counts
                }]
            },
            options: {
                backgroundColor: "white",
                scales:{
                    xAxes: {
                        ticks: {
                            font:{
                                size: 50
                            }
                        }
                    },
                    yAxes: {
                        ticks: {
                            font:{
                                size: 50
                            }
                        }
                    }
                }
            }

        }
        console.log(users)
        await infoLog("Chart config")
        const chartBuffer = await chart.renderToBuffer(chartConfig);
        await infoLog("Rendered chart ")

        const attachment = new AttachmentBuilder(chartBuffer, {name: "chart.png"})
        const finalEmbed = new EmbedBuilder()
            .setTitle(`Times people have said ${word}`)
            .setImage("attachment://chart.png")
            .setColor("Green");
        await interaction.editReply({
            embeds: [finalEmbed],
            files: [attachment]
        })
    },
};
