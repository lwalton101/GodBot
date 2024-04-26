import {load} from "ts-dotenv";

export const env = load({
    MYSQL_IP: String,
    MYSQL_USERNAME: String,
    MYSQL_PASSWORD: String,
    DISCORD_BOT_TOKEN: String
});