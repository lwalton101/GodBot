import {Collection, REST, Routes} from "discord.js";
import {clientId, guildId, token} from "./config/config.json";
import fs from "node:fs";
import path from "node:path";
import {Command} from "./Command";

export function deployCommands(){
	const commands = []
// Grab all the command files from the commands directory you created earlier
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
				commands.push(command.command.data.toJSON());
			} else {
				console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
			}
		}
	}

// Construct and prepare an instance of the REST module
	const rest = new REST().setToken(token);

// and deploy your commands!
	(async () => {
		try {
			console.log(`Started refreshing ${commands.length} application (/) commands.`);

			// The put method is used to fully refresh all commands in the guild with the current set
			await rest.put(
				Routes.applicationCommands(clientId.toString()),
				{ body: commands },
			);
		} catch (error) {
			// And of course, make sure you catch and log any errors!
			console.error(error);
		}
	})();
}
