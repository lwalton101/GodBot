import { app } from "./app";
import { setup } from "./discord";
import {Config} from "./config";

export const config = new Config("./config/config.json");
const port = process.env.PORT || '3000'
app.listen(port, () => {
	console.log(`App Listening on port ${port}`)
    console.log(`http://localhost:3000`)
});

setup();