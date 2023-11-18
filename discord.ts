import fs from "node:fs";
import path from "node:path";
import {Client, Collection, Events, GatewayIntentBits, Partials} from "discord.js";
import {token} from "./config/config.json";
import {Command} from "./Command";
import {EventHandler} from "./EventHandler";
import {deployCommands} from "./deploy_commands";

export const client = new Client({ intents: ["Guilds", "GuildVoiceStates", "GuildMessages", "GuildMembers", "MessageContent", "MessageContent", "GuildMessageReactions"], partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.GuildMember] });

let commands: Collection<string, Command> = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command: { command:Command } = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command.command && 'execute' in command.command) {
			commands.set(command.command.data.name, command.command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event: {eventHandler: EventHandler} = require(filePath);
	if (event.eventHandler.once) {
		client.once(event.eventHandler.name, (...args) => event.eventHandler.execute(...args));
	} else {
		client.on(event.eventHandler.name, (...args) => event.eventHandler.execute(...args));
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});


// Log in to Discord with your client's token
export function setup(){
	deployCommands();
    client.login(token);
}