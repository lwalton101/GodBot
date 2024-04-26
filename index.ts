import { app } from "./app";
import { setup } from "./discord";
import {db, wordUserRepo} from "./data-source"
import { User } from "./entity/User"
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