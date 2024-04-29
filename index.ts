import { app } from "./app";
import { setup } from "./discord";
import {db} from "./data-source"
import {init} from "./plugin_util";



const port = process.env.PORT || '3000'
app.listen(port, () => {
	console.log(`App Listening on port ${port}`)
    console.log(`http://localhost:3000`)
});

init();

db.initialize().then(async () => {
    console.log("DB Online");
}).catch(error => console.log(error))


setup();