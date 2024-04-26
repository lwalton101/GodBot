
import { load } from "ts-dotenv"
export const env = load({
    MYSQL_IP: String,
    MYSQL_USERNAME: String,
    MYSQL_PASSWORD: String,
});
console.log("env")

import { app } from "./app";
import { setup } from "./discord";
import {db} from "./data-source"

import {WordUser} from "./entities/WordUser";


const port = process.env.PORT || '3000'
app.listen(port, () => {
	console.log(`App Listening on port ${port}`)
    console.log(`http://localhost:3000`)
});



db.initialize().then(async () => {
    console.log("DB Online");
}).catch(error => console.log(error))


setup();