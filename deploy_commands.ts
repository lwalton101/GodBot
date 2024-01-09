import {REST, Routes} from "discord.js";
import {token,clientId,debugGuildId} from "./config/config.json"
import fs from "node:fs";
import path from "node:path";
import {Command} from "./Command";
const rest = new REST().setToken(token);
const commands: Command[] = [];
export function getCommands(){
	if(commands.length > 0){
		return commands;
	}
	const commandsPath = path.join(__dirname, 'commands');
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".ts"));
	commandFiles.forEach(file => {
		const filePath = path.join(commandsPath, file);
		const command: Command = require(filePath).command;
		if(command.data && command.execute){
			commands.push(command)
		}
	})
	return commands;
}
export function getCommandByName(name: string): Command{
	var commandList = getCommands();

	for(let command of commandList){
		if(command.data.name == name){
			return command;
		}
	}
	return null;
}
export async function deleteAllCommands() {
	console.log("Deleting Commands");
	await registerGlobalCommands([]);
	await registerGuildCommands([]);
}
async function registerGuildCommands(commands: any[]) {
	await rest.put(Routes.applicationGuildCommands(clientId, debugGuildId), {body: commands});
}

async function registerGlobalCommands(commands: any[]) {
	await rest.put(Routes.applicationCommands(clientId), {body: commands});
}
export async function deployCommands() {
	var commands = getCommands();
	var commandDatas = [];
	var adminCommandDatas = [];
	commands.forEach(command => {
		if (command.admin) {
			adminCommandDatas.push(command.data.toJSON());
		} else {
			commandDatas.push(command.data.toJSON());
		}
	})
	console.log(`Registering ${adminCommandDatas.length} admin commands`);
	await registerGlobalCommands(commandDatas);

	console.log(`Registering ${commandDatas.length} commands`);
	await registerGuildCommands(adminCommandDatas);

	console.log("finished registering")
}
