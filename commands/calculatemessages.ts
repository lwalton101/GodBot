import {Command} from "../Command";
import {Message, SlashCommandBuilder,} from "discord.js";
import {client} from "../discord";
import {infoLog} from "../log";
import {wordUserRepo} from "../data-source";
import {WordUser} from "../entities/WordUser";

export const command: Command = {
    admin: true,
    data: new SlashCommandBuilder()
        .setName('calculatemessages')
        .setDescription('Replies with Pong!')
        .addStringOption(option =>
            option
                .setName("guild_id")
                .setDescription("the guild id")
                .setRequired(true)
        ),
    async execute(interaction) {
        const authorWord: Map<string, Map<string, number>> = new Map<string, Map<string, number>>();
        const guildId = interaction.options.getString("guild_id");

        const guild = await client.guilds.fetch(guildId);

        if (!guild) {
            await interaction.reply("Cannot find guild " + guildId);
            return;
        }

        const guildChannels = await guild.channels.fetch();
        await interaction.reply(`${guildChannels.size} channels found!`);

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
                if (!authorWord.has(message.author.id)) {
                    authorWord.set(message.author.id, new Map());
                }

                const words = message.content.toLowerCase().split(" ").map(word => word.replace(/[^\w\s]/g, ''));
                for (const word of words) {
                    if (!authorWord.get(message.author.id).has(word)) {
                        authorWord.get(message.author.id).set(word, 0);
                    }
                    authorWord.get(message.author.id).set(word, authorWord.get(message.author.id).get(word) + 1);
                }
            }

            console.log("down hier")
        }

        console.log("Finished");
        console.log(authorWord);
        await wordUserRepo.clear();
        let wordUsers: WordUser[] = []
        for(let [authorId, t] of authorWord.entries()){
            for(let [word,count] of t){
                if(word.length > 25){
                    continue;
                }
                word = Buffer.from(word, 'utf-8').toString();
                let wu = wordUserRepo.create({
                    userId: authorId,
                    word: word,
                    count: count
                })
                wordUsers.push(wu);
            }
        }

        await wordUserRepo.save(wordUsers);
        console.log("done")
    },
};